# Sandhi: Generative Waveform Reconstruction for Lossy Audio

### 1) Problem Statement

#### 1.1) Problem Description
Many times when on a networked call and the connection dips for a few moments, it causes the audio to get cut out or sound robotic and cause a glitch. This happens because data packets get lost in transit. Right now, apps like Zoom or WhatsApp handle this in a very basic way; they either silence the gap or just replay the last recently received packet of sound to fill the missing parts. This method works for tiny glitches, but if enough data is lost that causes a whole syllable or a word to drop, the audio becomes choppy and hard to understand, forcing everyone to stop and repeat themselves. 

This is a very commonly faced problem and one often overlooked. An efficient solution to this can drastically improve the user experience in networked calls and audio transmission applications. 

We built a deep learning model that acts like a smart autocorrect for these audio gaps. Instead of just replaying old sound, the system analyzes the speech immediately before and after the drop to figure out what should be there. The model then generates the missing waveform, filling in the lost syllable such that it matches the speaker's tone and rhythm. The goal is to make those connection drops seamless, so the conversation keeps flowing even when the network is struggling.

#### 1.2) Architecture Diagram
<img width="2816" height="1536" alt="Architechture Diagram" src="https://github.com/user-attachments/assets/cf2d9f20-c026-47a6-a7b0-f07e45ea91d1" />

#### 1.3) Background Study
Traditional Packet Loss Concealment (PLC) architectures rely heavily on basic signal processing techniques such as replacing missing packets with zeroes, simple waveform repetition, or autoregressive linear prediction. These mechanisms are computationally cheap but struggle on multi-millisecond gaps, resulting in artifacts.
However, Generative Adversarial Networks (GANs) and Convolutional U-Nets for audio domain translation can directly reconstruct coherent waveforms. By using the contextual patterns and phonetics of the speech surrounding the missing segment, a GAN can learn to synthesize realistic completions.

---

### 2) DataSet

#### 2.1) Dataset chosen - why, what
**What:** We are utilizing the **LJSpeech-1.1 Dataset**. It is a public domain speech dataset consisting of 13,100 short audio clips of a single female speaker reading passages from 7 non-fiction books. Clips vary in length from 1 to 10 seconds.
**Why:** LJSpeech is an industry standard for Speech Synthesis and Neural Audio tasks. We chose this dataset for its high quality studio recording environment, consistent voice profile, and manageable size. Training our generative model on a clear, single voice allows the convolutional network to optimally learn the underlying phonetic representations, rhythms, and wave structures of human speech without the difficulty of cross speaker variations, and be easier to benchmark. Although a model that is to be used in a real life scenario will have to be trained on more diverse audio patterns.

#### 2.2) Data Preprocessing - what is being done
To ensure a standardized input space for our model, our preprocessing steps are as follows:
- **Resampling:** All audio clips are resampled to a uniform **22,050 Hz**.
- **Channel Normalization:** Extracted audio is downmixed and standardizied into a single **Mono** channel.
- **Amplitude Normalization:** We normalize the sound amplitude to the `[-1.0, 1.0]` range. This avoids distortions, guarantees uniform loudness across clips, and halp with back propagation convergence.
- **Data Export:** Finally, we convert and save back the processed tensors locally into 16-bit PCM `.wav` format.

---

### 3) Model & Data Flow

#### 3.1) What is the model architecture like
The core of our model works like a game between two AI networks a "Generator" and a "Discriminator":
- **The Generator:** 
  - This acts like tries to paint in the missing pieces of audio. It uses a "U-Net" architecture. Essentially, it first zooms out to understand the broad context of the spoken word (the Encoder), and then zooms back in to fill in the exact sound waves (the Decoder).
  - **Skip Connections:** help the model remember the fine details of the original audio so it doesn't get blurry when reconstructing the missing parts.
- **The Discriminator**
  - It listens to audio clips and tries to guess if it is real human speech, or if the Generator make this up

#### 3.2) What are parameters of the model
Audio is tricky to process because it's a long, continuous wave rather than a flat image. We configured our models parameters as follows:
- **Larger Kernel Size:** Sound moves fast, and even a short sound like "Ah" stretches across multiple of data points. We give our model a wide "window" so it can see a larger chunk of audio at once. This helps it understand the rhythm and tone of the voice, rather than getting confused by tiny microscopic slices of sound.
- **Zooming In and Out:** As the AI processes the audio, it groups the timeline into larger chunks to understand the "big picture" of the spoken word, rather than getting lost in every single vibration.

#### 3.3) Explanation of Dataflow
1. **Masking:** We take a perfectly good recording of someone speaking and artificially "break" it by deleting a chunk of sound in the middle. This simulates what happens during a bad internet connection.
2. **Inpainting:** We give this broken audio to the Generator. It listens to the sounds right before and right after the silent gap and tries to generate the missing audio to fill the hole.
3. **Evaluation:** The Discriminator then listens to the Generator's newly repaired clip and compares it to real, unbroken clips. It tries to spot the fake reconstruction.
4. **Optimization:** Based on the Discriminator's feedback, the Generator tweaks its approach to be more convincing next time. At the same time, we mathematically encourage the Generator to make sure its generated patch smoothly connects to the real audio around it so it doesn't cause a jarring popping noise.

<img width="2816" height="1536" alt="Block Diagram" src="https://github.com/user-attachments/assets/47164626-d34c-4e33-ae57-15d115da6000" />

---

### 4) Setup and how to run the project.

**Prerequisites:**
- **Node.js**: v18+ (For the React / Vite frontend UI)
- **Python**: `3.10.20` (Strictly pinned due to dependencies on PyTorch XPU and Intel IPEX libraries for accelerated operations)
- **Dependency Manager**: [UV](https://github.com/astral-sh/uv) or `pip`

#### A) Model / Backend Environment
The underlying algorithms and training pipelines are built using PyTorch within the `/model` directory.
1. Navigate to the project’s model directory:
   ```bash
   cd model
   ```
2. Setup parameters require Intel's IPEX and specific torch endpoints. We recommend using UV to pull from explicitly declared indexes configured in PyProject:
   ```bash
   us sync
   ```
   *(Alternatively, use pip to install the requirements tracked within `pyproject.toml`)*
3. **(Optional)** Unpack the `LJSpeech-1.1` dataset folder exactly into the `model/LJSpeech-1.1` directory if you are training fresh models.
4. Run the data standardizer to normalize and clean incoming Audio waves:
   ```bash
   python data-pre-processing.py
   ```

#### B) Frontend Application
Our interactive testing and wave visualization layer is deployed atop Vite and React.
1. Stay at the root of the project:
   ```bash
   cd ../
   ```
2. Build local JS packages:
   ```bash
   npm install
   ```
3. Boot the Vite development harness:
   ```bash
   npm run dev
   ```
4. Access the web interface spanning visual packet-loss controls on `http://localhost:5173`.
