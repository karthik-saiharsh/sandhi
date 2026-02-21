## Sandhi: Generative Waveform Reconstruction for Lossy Audio

### Why This?

Many times when on a networked call and the connection dips for a few moments, it causes the audio to get cut out or sound robotic and cause a glitch. This happens because data packets get lost in transit. Right now, apps like Zoom or WhatsApp handle this in a basic way; they either silence the gap or just replay the last recently received packet of sound to fill the missing parts. This method works for tiny glitches, but if enough data is lost that causes a whole syllable or a word to drop, the audio becomes choppy and hard to understand, forcing everyone to stop and repeat themselves. 

This is a very commonly faced problem and one often overlooked. An efficient solution to this can improve the user experience in networked calls and audio transmission applications. 

 

We plan to build a deep learning model that acts like a smart autocorrect for these audio gaps. Instead of just replaying old sound, the system analyzes the speech immediately before and after the drop to figure out what should be there. The model then generates the missing waveform, filling in the lost syllable such that it matches the speaker's tone and rhythm. The goal is to make those connection drops seamless, so the conversation keeps flowing even when the network is struggling. 


## System Architecture
<img width="2816" height="1536" alt="Architechture Diagram" src="https://github.com/user-attachments/assets/cf2d9f20-c026-47a6-a7b0-f07e45ea91d1" />



## Data Flow
<img width="2816" height="1536" alt="Block Diagram" src="https://github.com/user-attachments/assets/47164626-d34c-4e33-ae57-15d115da6000" />

