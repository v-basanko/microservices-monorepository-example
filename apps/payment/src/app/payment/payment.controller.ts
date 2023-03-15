import {
  Body,
  Controller,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { MessagePattern } from "@nestjs/microservices";
import { PaymentGenerateLink } from "@microservices-monorepository-example/contracts";
import {PaymentService} from "./payment.service";

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern({topic: PaymentGenerateLink.topic})
  async createPayment(@Body() dto: PaymentGenerateLink.Request):Promise<PaymentGenerateLink.Response> {
    const paymentEntity = await this.paymentService.createPayment(dto);
    return {
      paymentLink: this.paymentService.generatePaymentLink(paymentEntity)
    }
  }


}
