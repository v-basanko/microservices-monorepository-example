import { Injectable } from '@nestjs/common';
import {IPayment, } from "@microservices-monorepository-example/interfaces";
import { PaymentRepository } from "./repositories/payment.repository";
import { ConfigService } from "@nestjs/config";
import {PaymentEntity} from "./entities/payment.entity";

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly configService: ConfigService
  ) {

  }

  public async createPayment(dto: IPayment): Promise<PaymentEntity> {
    const newPaymentEntity = new PaymentEntity(dto);
    return await this.paymentRepository.createPayment(newPaymentEntity);
  }

  public generatePaymentLink(payment: PaymentEntity) {
    return `${this.configService.get('PAYMENT_CALLBACK_URL')}?id=${payment._id}`;
  }

  public async findById(id:string): Promise<PaymentEntity> {
    return await this.paymentRepository.findById(id);
  }

}
