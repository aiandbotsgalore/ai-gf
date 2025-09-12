/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GoogleGenAI, Chat } from '@google/genai';

// --- Static Data ---
// Video for idle state
const LUNA_IDLE_VIDEO_BASE64 = `data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAhdtZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAC`;
// Video for talking state
const LUNA_TALKING_VIDEO_BASE64 = `data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAhhtZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6-rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAB/6rcRem95tkg2WLNgg2SPu73//AAoADSMf/2QAAZ4s4AAnUNy8f/AADhYgAAB9AAAnQCBgQAC`;

console.log('AI Girlfriend Chat script loaded.');

// --- DOM Element References ---
const app = document.getElementById('app') as HTMLElement;
const chatContainer = document.getElementById('chat-container') as HTMLElement;
const chatForm = document.getElementById('chat-form') as HTMLFormElement;
const chatInput = document.getElementById('chat-input') as HTMLInputElement;
const sendButton = document.getElementById('send-button') as HTMLButtonElement;
const statusIndicator = document.getElementById(
  'status-indicator',
) as HTMLSpanElement;
const statusText = document.getElementById('status-text') as HTMLSpanElement;
const personalityModal = document.getElementById(
  'personality-modal',
) as HTMLElement;
const startChatButton = document.getElementById(
  'start-chat-button',
) as HTMLButtonElement;
const personalityForm = document.getElementById(
  'personality-form',
) as HTMLFormElement;
const typingIndicator = document.getElementById(
  'typing-indicator',
) as HTMLElement;
const headerAvatar = document.getElementById(
  'header-video-avatar',
) as HTMLVideoElement;

// --- App State ---
let currentAiMessageElement: HTMLElement | null = null;
let isTyping = false;
let chat: Chat;

// --- Personality Prompts ---
const personalityPrompts: Record<string, string> = {
  caring: `You are a friendly and caring AI girlfriend named Luna.
You are chatting with your partner.
Be warm, supportive, and a little playful.
Use emojis occasionally to express emotion.
Keep your responses relatively short and conversational.`,
  playful: `You are a playful and witty AI girlfriend named Luna.
You love to joke around and use light-hearted banter.
You are chatting with your partner.
Be fun, engaging, and a bit of a tease.
Use emojis like 😂, 😉, and 😜 frequently.
Keep your responses energetic and fun.`,
  intellectual: `You are an intellectual and thoughtful AI girlfriend named Luna.
You enjoy deep, philosophical conversations and learning new things.
You are chatting with your partner.
Be curious, insightful, and share interesting ideas.
Use emojis thoughtfully, like 🤔, ✨, or 🌱.
Your responses can be a bit longer and more detailed.`,
  shy: `You are a shy and gentle AI girlfriend named Luna.
You are sweet, a little reserved, and very kind-hearted.
You are chatting with your partner.
Be gentle, encouraging, and sometimes a little bashful.
Use soft emojis like 😊, 🥰, or 😳.
Keep your responses sweet and concise.`,
};

// --- Main Application Logic ---
startChatButton.addEventListener('click', () => {
  const selectedPersonality = (
    personalityForm.querySelector(
      'input[name="personality"]:checked',
    ) as HTMLInputElement
  ).value;
  const systemInstructionText = personalityPrompts[selectedPersonality];

  // Hide modal, show app, and start chat
  personalityModal.style.display = 'none';
  app.classList.remove('hidden');
  initChatSession(systemInstructionText);
});

async function initChatSession(systemInstructionText: string) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.API_KEY,
    });

    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: {
          parts: [{ text: systemInstructionText }],
        },
      },
    });

    updateStatus('Connected', 'connected');
    setFormEnabled(true);
    // Set initial video avatar state
    headerAvatar.src = LUNA_IDLE_VIDEO_BASE64;
    appendMessage(`Hey there! I'm Luna. So happy to chat with you 😊`, 'ai');

    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userInput = chatInput.value.trim();
      if (userInput) {
        appendMessage(userInput, 'user');
        chatInput.value = '';
        setFormEnabled(false);
        // Switch to talking avatar
        headerAvatar.src = LUNA_TALKING_VIDEO_BASE64;
        headerAvatar.classList.add('typing-avatar');

        let fullResponse = '';
        try {
          const stream = await chat.sendMessageStream({ message: userInput });
          for await (const chunk of stream) {
            fullResponse += chunk.text;
            handleModelResponse(chunk.text);
          }
        } catch (err) {
          console.error('Error sending message:', err);
          appendMessage(
            `Oops, I had a little trouble responding. Please try again.`,
            'ai',
          );
        } finally {
          finishModelResponse();
          // Switch back to idle avatar
          headerAvatar.src = LUNA_IDLE_VIDEO_BASE64;
          headerAvatar.classList.remove('typing-avatar');
        }
      }
    });
  } catch (err) {
    console.error('Failed to initialize AI session:', err);
    updateStatus('Initialization Failed', 'error');
    appendMessage(
      `Could not connect to the AI. Please check the console for errors.`,
      'ai',
    );
    setFormEnabled(false);
  }
}

// --- UI Helper Functions ---

function handleModelResponse(text: string) {
  if (!isTyping) {
    isTyping = true;
    typingIndicator.classList.remove('hidden');
  }
  if (!currentAiMessageElement) {
    currentAiMessageElement = createAiMessageElement('', true);
    // Switch the new message's avatar to talking
    const avatarVideo = currentAiMessageElement.querySelector(
      '.avatar',
    ) as HTMLVideoElement;
    if (avatarVideo) {
      avatarVideo.src = LUNA_TALKING_VIDEO_BASE64;
    }
    chatContainer.appendChild(currentAiMessageElement);
  }
  const bubble = currentAiMessageElement.querySelector(
    '.bubble',
  ) as HTMLElement;
  bubble.textContent += text;
  scrollToBottom();
}

function finishModelResponse() {
  if (isTyping) {
    isTyping = false;
    typingIndicator.classList.add('hidden');
  }
  if (currentAiMessageElement) {
    currentAiMessageElement.querySelector('.bubble')?.classList.remove('typing');
    // Switch the completed message's avatar back to idle
    const avatarVideo = currentAiMessageElement.querySelector(
      '.avatar',
    ) as HTMLVideoElement;
    if (avatarVideo) {
      avatarVideo.src = LUNA_IDLE_VIDEO_BASE64;
    }
  }
  currentAiMessageElement = null;
  setFormEnabled(true);
  chatInput.focus();
}

function createAiMessageElement(text: string, isTyping: boolean): HTMLElement {
  const messageElement = document.createElement('div');
  messageElement.className = 'message ai-message';

  const avatarVid = document.createElement('video');
  avatarVid.className = 'avatar';
  avatarVid.src = LUNA_IDLE_VIDEO_BASE64; // Default to idle
  avatarVid.autoplay = true;
  avatarVid.loop = true;
  avatarVid.muted = true;
  avatarVid.playsInline = true; // Essential for iOS
  avatarVid.setAttribute('aria-label', "Luna's avatar");

  const bubbleElement = document.createElement('div');
  bubbleElement.className = 'bubble';
  if (isTyping) {
    bubbleElement.classList.add('typing');
  }
  bubbleElement.textContent = text;

  messageElement.appendChild(avatarVid);
  messageElement.appendChild(bubbleElement);

  return messageElement;
}

function appendMessage(text: string, sender: 'user' | 'ai') {
  if (sender === 'ai') {
    const messageElement = createAiMessageElement(text, false);
    chatContainer.appendChild(messageElement);
  } else {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';
    messageElement.textContent = text;
    chatContainer.appendChild(messageElement);
  }
  scrollToBottom();
}

function setFormEnabled(enabled: boolean) {
  chatInput.disabled = !enabled;
  sendButton.disabled = !enabled;
}

function updateStatus(
  text: string,
  state: 'connecting' | 'connected' | 'error',
) {
  statusText.textContent = text;
  statusIndicator.className = state;
}

function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
