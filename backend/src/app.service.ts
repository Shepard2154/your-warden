import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './app.dto';
import { GenerateContentResponse, GoogleGenAI } from "@google/genai";

@Injectable()
export class AppService {
  private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  getHello(): string {
    return process.env.GEMINI_API_KEY ?? 'Hello World!';
  }

  async generateAnswer(CreateQuestionDto: CreateQuestionDto): Promise<GenerateContentResponse> {
    let { question } = { ...CreateQuestionDto };
    const response = await this.ai.models.generateContent({
      model: process.env.AI_MODEL ?? 'gemini-2.0-flash',
      contents: question,
    });
    return response;
  }
}
