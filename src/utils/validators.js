import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^(\+?250)?[0-9]{9}$/, 'Enter a valid Rwandan phone number').optional().or(z.literal('')),
  subject: z.string().min(3, 'Subject is required').max(120),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName:  z.string().min(2, 'Last name is required'),
  email:     z.string().email('Valid email required'),
  phone:     z.string().regex(/^(\+?250)?[0-9]{9}$/, 'Valid Rwandan phone required'),
  address:   z.string().min(5, 'Delivery address is required'),
  district:  z.string().min(2, 'District is required'),
  sector:    z.string().min(2, 'Sector is required'),
  notes:     z.string().max(500).optional(),
  paymentMethod: z.enum(['momo', 'cash', 'card'], {
    required_error: 'Select a payment method',
  }),
})

export const reviewSchema = z.object({
  rating:  z.number().min(1).max(5),
  title:   z.string().min(3).max(100),
  comment: z.string().min(10).max(1000),
  name:    z.string().min(2).max(80),
  email:   z.string().email(),
})