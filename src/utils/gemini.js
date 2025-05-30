import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function parseTask(taskDescription) {
  try {
    const model = genAI.getGenerativeModel({ model: process.env.NEXT_PUBLIC_GEMINI_MODEL });

    const prompt = `Parse the following task description and extract these components:
      - Task Name
      - Assignee (if mentioned)
      - Due Date and Time (if mentioned)
      - Priority (default to P3 if not specified)
      
      Task description: "${taskDescription}"
      
      Format your response EXACTLY as a JSON object with these keys:
      {
        "taskName": "<extracted task name>",
        "assignee": "<assignee name or null>",
        "dueDate": "<ISO date string or null>",
        "priority": "<P1|P2|P3|P4>"
      }
      
      Do not include any other text, only the JSON object.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    try {
      // Remove any potential markdown code block markers
      const cleanJson = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
      const parsed = JSON.parse(cleanJson);

      // Validate the response format
      if (!parsed.taskName || typeof parsed.taskName !== 'string') {
        throw new Error('Invalid task name in response');
      }

      // Ensure priority is valid
      if (!['P1', 'P2', 'P3', 'P4'].includes(parsed.priority)) {
        parsed.priority = 'P3'; // Default to P3 if invalid
      }

      return parsed;
    } catch (e) {
      console.error('Failed to parse AI response:', text);
      throw new Error('Failed to parse AI response');
    }
  } catch (error) {
    console.error('Error parsing task:', error);
    throw error;
  }
}

export async function parseTranscript(transcript) {
  try {
    const model = genAI.getGenerativeModel({ model: process.env.NEXT_PUBLIC_GEMINI_MODEL });

    const prompt = `Extract tasks from the following meeting transcript. For each task, identify:
      - Task Description
      - Assignee
      - Deadline
      - Priority (default to P3)
      
      Meeting Transcript: "${transcript}"
      
      Format your response as a JSON array of task objects with these keys:
      [
        {
          "taskName": "<task description>",
          "assignee": "<assignee name>",
          "dueDate": "<ISO date string or null>",
          "priority": "<P1|P2|P3|P4>"
        }
      ]
      
      Rules:
      1. Extract every task mentioned in the transcript
      2. For each task, the deadline should be a proper ISO date string
      3. Default to P3 priority unless urgency is clearly indicated
      4. Do not include any other text, only the JSON array

      Do not include any other text, only the JSON array.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    try {
      // Remove any potential markdown code block markers
      const cleanJson = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
      const parsed = JSON.parse(cleanJson);

      // Validate the response format
      if (!Array.isArray(parsed)) {
        throw new Error('Invalid response format - expected array');
      }

      // Validate and normalize each task
      return parsed.map(task => {
        if (!task.taskName || typeof task.taskName !== 'string') {
          throw new Error('Invalid task name in response');
        }

        // Ensure priority is valid
        if (!['P1', 'P2', 'P3', 'P4'].includes(task.priority)) {
          task.priority = 'P3'; // Default to P3 if invalid
        }

        return task;
      });
    } catch (e) {
      console.error('Failed to parse AI response:', text);
      throw new Error('Failed to parse AI response');
    }
  } catch (error) {
    console.error('Error parsing transcript:', error);
    throw error;
  }
}
