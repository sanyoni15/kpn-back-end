import { TestimonialController } from './controller/TestimonialController';

export const routes = [
  {
    method: 'get',
    route: '/testimonial',
    controller: TestimonialController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/testimonial/:id',
    controller: TestimonialController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/testimonial',
    controller: TestimonialController,
    action: 'save',
  },
  {
    method: 'put',
    route: '/testimonial/:id',
    controller: TestimonialController,
    action: 'update',
  },
  {
    method: 'delete',
    route: '/testimonial/:id',
    controller: TestimonialController,
    action: 'remove',
  },
];
