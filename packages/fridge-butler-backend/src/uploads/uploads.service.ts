import { Injectable } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';

@Injectable()
export class UploadsService {
  async analyzeImage(file: Express.Multer.File, prompt: string): Promise<any> {
    const formData = new FormData();
    const fileBlob = new Blob([file.buffer], { type: file.mimetype });
    formData.append('file', fileBlob, file.originalname);
    formData.append('prompt', prompt);

    const response = await axios.post('YOUR_API_ENDPOINT', formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer YOUR_API_KEY`,
      },
    });

    return response.data;
  }
}
