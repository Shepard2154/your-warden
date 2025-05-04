import { Controller, Get, Post, Body, Header } from '@nestjs/common';
import { GenerateContentResponse } from "@google/genai";
import { AppService } from './app.service';
import { CreateQuestionDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('message')
  @Header('Access-Control-Allow-Origin', '*')
  async generateAnswer(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<GenerateContentResponse> {
    console.log('Question: ', createQuestionDto);
    const result = await this.appService.generateAnswer(createQuestionDto);
    console.log('Answer: ', result);
    return result;
  }
}
