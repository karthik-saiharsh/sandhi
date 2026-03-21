# Sandhi: Generative Waveform Reconstruction for Lossy Audio

### Problem Statement and Context
The project aims to address a commonly overlooked issue in modern digital communication: audio degradation during networked calls due to packet loss. When an internet connection fluctuates, data packets carrying audio information are frequently lost in transit, resulting in missing audio segments, robotic distortions, or jarring glitches.

Currently, mainstream communication applications such as Zoom or WhatsApp employ basic Packet Loss Concealment mechanisms to mitigate this network instability. These traditional signal processing methods typically involve replacing the missing packets with silence, simple waveform repetition, or autoregressive linear prediction. While computationally inexpensive and effective for minor, fractional glitches, these approaches struggle significantly when dealing with multi-millisecond gaps. If enough data drops to omit an entire syllable or word, the audio becomes choppy and unintelligible, disrupting the flow of conversation and forcing participants to repeat themselves.

To resolve this, we propose a deep learning based solution designed to act as an intelligent "audio bandage" or autocorrect for these audio gaps. Instead of merely replaying old sound bites, the proposed model analyzes the contextual speech patterns and phonetics immediately surrounding the missing segment. The model aims to reconstruct the missing waveform realistically, filling in the lost syllable such that it matches the speaker's original tone and rhythm to ensure a seamless conversational experience.

---

### Architechture
<img width="2816" height="1536" alt="Architechture Diagram" src="https://github.com/user-attachments/assets/cf2d9f20-c026-47a6-a7b0-f07e45ea91d1" />

<img width="2816" height="1536" alt="Block Diagram" src="https://github.com/user-attachments/assets/47164626-d34c-4e33-ae57-15d115da6000" />

We use a **Generative Adversarial Network (GAN)** architecture. The system has a dual network approach comprising a Generator and a Discriminator that train competitively to produce realistic audio reconstructions.

The architecture workflow is mainly divided into the following stages:

- **Data Preparation and Masking:** The pipeline begins with a normal audio sample. To simulate network packet loss this waveform undergoes a "Random Masking & Cropping" process. This splits the data into two streams: the Ground Truth Audio (the untouched target) and the Masked Input Audio (the degraded signal where the dropped packet is replaced with a zeroed gap).

- **Generator (1D Convolutional U-Net):** The Masked Input Audio is fed into the Generator, which utilizes a `1D Convolutional U-Net` architecture to reconstruct the missing audio.

  - **Encoder:** Uses `Conv1D` downsampling layers to compress the audio into a dense, lower-dimensional latent representation capturing the surrounding phonetic context.

  - **Decoder:** Utilizes `ConvTranspose1D` upsampling layers to reconstruct the waveform from this latent space back to its original resolution.

  - **Skip Connections:** Critical to the U-Net design, these connections link corresponding layers of the Encoder and Decoder, allowing high-frequency, fine-grained temporal details to bypass the bottleneck and directly inform the output. The final output is the Generated Inpainted Waveform.

- **Discriminator (1D Conv Classifier):** The Discriminator evaluates waveforms to determine their authenticity. It takes either the Ground Truth Audio or the Generated Inpainted Waveform and processes it through a series of `1D Convolutional` layers. It concludes whether the audio sample is Real or Fake.

---

### Background Study
The area of **Packet Loss Concealment (PLC)** has traditionally relied on basic signal processing techniques to address missing audio data. Conventional architectures typically utilize **heuristic methods** such as zero-insertion (replacing missing packets with silence), **basic waveform repetition**, or **autoregressive linear prediction**. While these mechanisms offer the advantage of being computationally inexpensive, they exhibit limitations when attempting to bridge longer audio gaps. These traditional approaches also fail to preserve the natural flow of speech, resulting in noticeable artifacts and degradation in audio quality.

Recent advancements in deep learning, however, have brought about more robust solutions, through the application of **Generative Adversarial Networks (GANs)** and **Convolutional U-Nets**. Unlike traditional methods that attempt to mathematically estimate or stretch existing signals, these new techniques have the capability to directly reconstruct coherent and complex waveforms.

By analyzing the patterns and the phonetics of the speech before and after the dropped segment, a GAN can effectively learn to synthesize realistic, good quality audio.

---

### Additional Applications of this Idea
While the objective the we are working toward with this project is to mitigate network induced packet loss during calls, the idea of audio inpainting has use cases across many other domains. The ability of a GAN to intelligently synthesize missing audio based on surrounding context can be adapted to solve several other problems:

- **Audio Restoration Attempts:** Historical recordings stored on physical media, such as magnetic tape or vinyl, often suffer from localized degradation like scratches, pops, or tape dropouts. Instead of merely applying basic noise-reduction filters, the proposed model could be utilized to analyze the surviving audio frames and synthetically reconstruct the lost segments, thereby restoring the continuous waveform and fidelity of legacy media.

- **Post-Production/Editing:** During professional audio recording or broadcasting, transient unwanted noises—such as microphone bumps, harsh sounds, or unexpected background interruptions can compromise an otherwise good take. By isolating momentary disruption, the GAN model could function as an editing tool, automatically generating a seamless track to fill the gap without requiring manual waveform editing.

---

### Dataset Selection and Justification

For the training and evaluation, we decided to use the **LJ-Speech Dataset**. This dataset is well recognized, public domain resource of `13,100` short audio clips, ranging in length from **1 to 10 seconds**. The recordings involve a female speaker reading passages from seven different non-fiction books.

- LJSpeech is an industry standard benchmark for tasks related to Neural Audio and Speech Synthesis. Other popular tools like Speech to Text models also often use the **LJ Speech** Dataset for their models.

- The dataset offers a high quality studio recording environment with consistent voice profile. By restricting the training data to a clear, single voice, the `Convolutional U-Net` can focus on learning the phonetic representations, rhythms, and wave structures of human speech. This isolation prevents the network from initially struggling with the complex audio tones and variations introduced by multiple speakers.

- The manageable size of the dataset ensures that training iterations can be conducted efficiently while still providing enough data for the generative model to converge. The computational limitations we have, force us to go with a constrained dataset so that the model can be trained on our local devices, without a GPU.

**A note about further improvements**
While very useful for establishing a proof of concept and benchmarking the architecture, we do acknowledge the for the model to be reliably deployed in a real world, commercial application (such as a live VoIP call), it would require training on a significantly more diverse set of audio patterns, encompassing various accents, timbres, and background noise conditions.

---

### Data Preprocessing
Before the LJSpeech dataset can be used for training the GAN, we preprocess the audio data ad follows:

- **Audio Standardization:** Initially, we load all `.wav` files and unify their sample rates to one value `22,050 Hz` in this case, to ensure uniform temporal resolution across the dataset. Any variations in volume or amplitude are normalized to prevent the model from inappropriately weighting louder recordings over quieter ones.

- **Segment Cropping:** To create manageable inputs for the Model and to optimize memory allocation during training, the variable length audio clips are sliced into fixed length segments. These  segments serve as the training examples.

- **Simulating Packet Loss (Masking Generation):** This is the main step of preprocessing. We synthetically cause audio degradation. For every good audio segment generated, a parallel "masked" version is created. This is achieved by taking a continuous sub section within the audio array and zeroing out the corresponding amplitude values, creating artificial silence.

- **Data Pairing:** The last step of the preprocessing pipeline is a paired dataset. Each training example consists of an input tensor representing the degraded, masked audio waveform, paired directly with its corresponding ground truth target tensor representing the original, unbroken audio.

---

### Model Building
The model was implemented using the `PyTorch`, augmented by the `Intel Extension for PyTorch (IPEX)` to accelerate compute operations for `XPU (Intel GPU)` hardware. The model processes **1-second audio context windows (22,050 samples)** with a **batch size of 32** to maximize vectorization and hardware utilization.

The implementation details of the two adversarial networks are as follows:

- **The Generator (1-D Convolutional U-Net)**
The Generator network, approximately **23.5 million** trainable **parameters**, is constructed as a **1-Dimensional Convolutional U-Net** designed to take in masked waveforms and output inpainted waveforms.

- **Encoder:** The encoder pathway consists of **5 downsampling layers**. Each block utilizes a **Conv1D** layer with a **kernel size of 15 and a stride of 2 (basically halving the temporal dimension)**, followed by **BatchNorm1d and a LeakyReLU activation** function (negative slope of 0.2). The channel depth starts at a base of 32 and doubles with each block, reaching 512 channels.

- **Bottleneck:** At the deepest layer, the latent representation passes through a single **Conv1d layer** (1024 channels) with **BatchNorm1d and a standard ReLU activation.**

- **Decoder:** This part mirrors the encoder with **5 upsampling blocks**. These utilize **ConvTranspose1d** layers (kernel size 15, stride 2) followed by **BatchNorm1d and ReLU** activations. 
**Channel wise skip connections** concatenate the output of each encoder level to its corresponding decoder level to **preserve high-resolution spatial features**.

- **Output Layer:** A final **ConvTranspose1d** projection maps the feature space back to a single audio channel, passed through a **Tanh** activation function to bound the final synthesized waveform amplitude between -1.0 and 1.0.

- **The Discriminator (1-D Conv Classifier)**
The Discriminator operates as a binary classifier evaluating the realism of the full 1-second waveform clips. With roughly **2.6 million** parameters, it employs **5 sequential Conv1d** downsampling blocks identical in structure to the Generator's encoder (stride 2, BatchNorm1d, LeakyReLU). The resulting features are compressed using an **AdaptiveAvgPool1d(1)** layer, flattened, and passed through a Linear layer to output a raw logit score representing the real/fake probability**.

**Optimizers, Loss Functions, and Training Dynamics**

The training loop uses the **Adam Optimizer** for **both networks**, configured with beta values of (0.5, 0.999). The learning rates are set at **2e-4** for the Generator (LR_G) and **1e-4** for the Discriminator (LR_D), and are decayed linearly over the final 25% of training epochs using a Lambda learning-rate scheduler.

**The Loss Functions used are:**

- **Adversarial Loss:** Both models utilize **Binary Cross-Entropy** with Logits (BCEWithLogitsLoss) to evaluate the discriminator's output scores against binary true/false labels.

- **L1 Reconstruction Loss:** An **L1Loss** function calculates the **Mean Absolute Error (MAE)** between the Generator's synthesized wave and the clean ground-truth wave.

- The **total objective function** for the **Generator** is defined as the **Adversarial Loss + the L1 Reconstruction Loss** weighted by a scaling factor. Also, the training loop is accelerated utilizing PyTorch's autocast functionality, casting operations to bfloat16 to leverage mixed-precision computing.

---

### Evolution of the Workflow & Limitations
The development and training of the GAN presented major computational challenges. Initially, we aimed for a training cycle of 50 epochs to allow the model to converge reasonably and learn the structure of speech. However, the initial, unoptimized pure PyTorch implementation proved computationally difficult on the available local hardware, initially requiring 7 hours to complete a single training epoch. At this rate, the intended 50 epoch training would take 350 hours, which is entirely beyond the project's scope and time constraints.

To try and overcome this bottleneck, we changed the training pipeline.

- **Hardware-Specific Acceleration (IPEX):** The first major optimization involved transitioning the computational load to leverage **dedicated hardware accelerators**. By using the **Intel Extension for PyTorch (IPEX)**, the model was optimized to run on an Intel XPU (integrated/discrete GPU) rather than relying solely on standard CPU execution. This hardware specific enhancement reduced the training time from the initial 7 hours down to approximately 5 hours per epoch.

- **I/O Bottleneck Elimination (In-Memory Dataset):** Looking at the training loop we realized that continuous disk-read operations (fetching individual .wav files for every batch) caused severe I/O bottlenecks. To resolve this, we decided to pre load all 13,100 processed audio clips directly into the system's active RAM prior to training. While highly memory intensive, this entirely eliminated disk read latency.

- **Mixed-Precision Training (bfloat16):** To further accelerate tensor operations, the training loop was wrapped in **PyTorch's autocast** context manager. This allowed the network to dynamically execute mathematical calculations using bfloat16 (Brain Floating Point) precision instead of the standard 32-bit floats. Combined with an increased batch size of 32 to maximize vectorization, these improvements reduced the computational overhead.

**Final Training Constraints & Limitations**
Through the combined application of IPEX hardware acceleration, in-memory data loading, and bfloat16 mixed precision, the total training time went down to approximately 2 hours per epoch.

Despite these massive efficiency gains, rendering 50 epochs still required an unfeasible ~100 hours of continuous, uninterrupted compute time. Consequently, due to the limitations in available computational power, the final prototype model was trained for only 1 epoch (NUM_EPOCHS = 1). While this single-epoch training is essentially of no practical use, it does serves as a functional proof-of-concept for the generative inpainting architecture.

---

### Scope for Future Improvements
While the current iteration of the project serves as a proof-of-concept for generative audio inpainting, improvements in several areas remain to be explored for commercial, real world viability.


- **Extended Training and Computational Scaling:** As established during the development phase, local hardware constraints limited the model's training to a single epoch. Future iterations will require migrating the training pipeline to high-performance cloud computing clusters or to use better hardware. This will enable the originally planned 50 epoch training cycle, allowing the GAN to achieve a decent convergence.

- **Dataset Diversification and Generalization:** The current prototype is optimized for a single female voice profile utilizing the LJ-Speech dataset. To function reliably in a public facing application, the model must be trained on a larger set of audio data. Adding in multi speaker datasets that encompass diverse accents, varying vocal timbres, and complex background noise conditions will be useful for the model to generalize across a diverse user base.

- **Real-Time Inference and Latency Optimization:** For seamless integration into live Voice over IP (VoIP) platforms or communication applications, the model's inference speed must be optimized. Future work could involve techniques such as model quantization, weight pruning, and compilation via frameworks like ONNX or TensorRT. These optimizations are necessary to ensure the model can detect a packet drop and synthesize the missing waveform with sub-millisecond latency, preventing any perceived delay in the live conversation.

- **Dynamic Burst Loss Handling:** The current training methodology simulates packet loss through randomized, fixed-window masking. Real-world network instability often manifests as unpredictable "burst losses" where consecutive packets drop in varying patterns. Upgrading the preprocessing and masking algorithm to simulate dynamic, burst-loss scenarios will train the model to handle erratic network conditions more effectively.

---

### Setup and how to run the project.

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
