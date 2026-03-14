import torch
import torch.nn as nn
import os

from .download_model import TARGET_MODEL_PATH

class EncoderBlock(nn.Module):
    def __init__(self, in_ch: int, out_ch: int, kernel: int = 15):
        super().__init__()
        self.block = nn.Sequential(
            nn.Conv1d(in_ch, out_ch, kernel_size=kernel,
                      stride=2, padding=kernel // 2, bias=False),
            nn.BatchNorm1d(out_ch),
            nn.LeakyReLU(0.2, inplace=True),
        )

    def forward(self, x):
        return self.block(x)


class DecoderBlock(nn.Module):
    def __init__(self, in_ch: int, out_ch: int, kernel: int = 15):
        super().__init__()
        self.block = nn.Sequential(
            nn.ConvTranspose1d(in_ch, out_ch, kernel_size=kernel,
                               stride=2, padding=kernel // 2,
                               output_padding=1, bias=False),
            nn.BatchNorm1d(out_ch),
            nn.ReLU(inplace=True),
        )

    def forward(self, x, skip):
        x = self.block(x)
        if x.shape[-1] != skip.shape[-1]:
            x = x[..., : skip.shape[-1]]
        return torch.cat([x, skip], dim=1)


class UNetGenerator(nn.Module):
    def __init__(self, base_ch: int = 32, n_blocks: int = 5):
        super().__init__()

        self.encoders = nn.ModuleList()
        in_ch = 1
        enc_channels = []
        for i in range(n_blocks):
            out_ch = base_ch * (2 ** i)
            self.encoders.append(EncoderBlock(in_ch, out_ch))
            enc_channels.append(out_ch)
            in_ch = out_ch

        bottleneck_ch = base_ch * (2 ** n_blocks)
        self.bottleneck = nn.Sequential(
            nn.Conv1d(in_ch, bottleneck_ch, kernel_size=15,
                      stride=2, padding=7, bias=False),
            nn.BatchNorm1d(bottleneck_ch),
            nn.ReLU(inplace=True),
        )

        self.decoders = nn.ModuleList()
        in_ch = bottleneck_ch
        for i in reversed(range(n_blocks)):
            skip_ch = enc_channels[i]
            out_ch  = skip_ch
            self.decoders.append(DecoderBlock(in_ch, out_ch))
            in_ch = out_ch + skip_ch

        self.head = nn.Sequential(
            nn.ConvTranspose1d(in_ch, 1, kernel_size=15,
                               stride=2, padding=7, output_padding=1, bias=True),
            nn.Tanh(),
        )

    def forward(self, x):
        skips = []
        h = x
        for enc in self.encoders:
            h = enc(h)
            skips.append(h)

        h = self.bottleneck(h)

        for dec, skip in zip(self.decoders, reversed(skips)):
            h = dec(h, skip)

        out = self.head(h)
        if out.shape[-1] != x.shape[-1]:
            out = out[..., : x.shape[-1]]
        return out


def load_model():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = UNetGenerator(base_ch=32, n_blocks=5).to(device)
    if os.path.exists(TARGET_MODEL_PATH):
        checkpoint = torch.load(TARGET_MODEL_PATH, map_location=device, weights_only=True)
        model.load_state_dict(checkpoint["model_state"])
        print(f"Loaded weights from {TARGET_MODEL_PATH}")
    else:
        print(f"Warning: Model file not found at {TARGET_MODEL_PATH}")
    model.eval()
    return model, device

def reconstruct_waveform(model, device, masked_audio_tensor):
    with torch.no_grad():
        masked_audio_tensor = masked_audio_tensor.to(device)
        if len(masked_audio_tensor.shape) == 1:
            masked_audio_tensor = masked_audio_tensor.unsqueeze(0).unsqueeze(0)
        elif len(masked_audio_tensor.shape) == 2:
            masked_audio_tensor = masked_audio_tensor.unsqueeze(0)

        output = model(masked_audio_tensor)
        return output.cpu().squeeze().numpy()
