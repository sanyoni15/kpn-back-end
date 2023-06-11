import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
const Joi = require('joi');
const path = require('path');

import { Testimonial, postTypes } from '../entity/Testimonial';

const testimonialSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  post: Joi.string()
    .valid(...Object.values(postTypes))
    .required(),
});

const photoSchema = Joi.object({
  photo: Joi.object().required(),
});

export class TestimonialController {
  private testimonialRepository = AppDataSource.getRepository(Testimonial);

  async all(request: Request, response: Response, next: NextFunction) {
    const testimonial = await this.testimonialRepository.find({
      where: { active: true },
    });

    response.status(200).send(testimonial);
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const testimonial = await this.testimonialRepository.findOne({
      where: { id, active: true },
    });

    if (!testimonial) {
      return 'unregistered testimonial';
    }

    response.status(200).send(testimonial);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      await testimonialSchema.validateAsync(request.body);
      await photoSchema.validateAsync(request.files);

      let { name, description, post } = request.body;

      const file = request.files.photo;

      await file.mv(path.resolve(__dirname, '../uploads', file.name));

      if (!file || Object.keys(request.files).length === 0) {
        response.status(400).send('No files were uploaded.');
      }

      const photo = file.name;

      const user = Object.assign(new Testimonial(), {
        photo,
        name,
        description,
        post,
      });

      const saveData = await this.testimonialRepository.save(user);
      response.status(201).send(saveData);
    } catch (error) {
      return error;
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      await testimonialSchema.validateAsync(request.body);
      await photoSchema.validateAsync(request.files);

      const id = parseInt(request.params.id);
      const data = request.body;

      let testimonialToUpdate = await this.testimonialRepository.findOneBy({
        id,
      });

      if (!testimonialToUpdate) {
        return 'This testimonial is not exist';
      }

      const file = request.files.photo;

      await file.mv(path.resolve(__dirname, '../uploads', file.name));

      if (!file || Object.keys(request.files).length === 0) {
        response.status(400).send('No files were uploaded.');
      }

      data.photo = file.name;

      const updateData = await this.testimonialRepository.update({ id }, data);

      response.status(200).send(updateData);
    } catch (err) {
      return err;
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      let testimonialToUpdate = await this.testimonialRepository.findOneBy({
        id,
      });

      if (!testimonialToUpdate) {
        return 'This testimonial is not exist';
      }

      await this.testimonialRepository.update({ id }, { active: false });

      response.status(200).send('Testimonial has been removed');
    } catch (error) {
      return error;
    }
  }
}
