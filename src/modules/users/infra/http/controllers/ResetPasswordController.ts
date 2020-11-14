import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPassowordService';

export default class ResetPassowordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const restePassword = container.resolve(ResetPasswordService);

    await restePassword.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}
