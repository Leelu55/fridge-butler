import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';


@Injectable()
export class UploadsService {
    private openai: OpenAI;
    constructor() {
      this.openai = new OpenAI();
    }

    async createChatCompletionWithImage(file: Express.Multer.File, prompt: string) {
    const imageBase64 = file.buffer.toString('base64');
    const imageUrl = `data:image/jpeg;base64,${imageBase64}`;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4-vision-preview", 
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", "image_url": {"url": imageUrl }}
          ]
        }
      ]
    });

    return response.choices[0].message;
  }
}

