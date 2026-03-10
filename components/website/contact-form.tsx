"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast.error('Please fill in name, email, and message.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
      if (!res.ok) {
        toast.error(data?.message ?? 'Failed to send your inquiry.')
        return
      }
      toast.success('Your inquiry has been sent. We will get back to you shortly.')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 sm:gap-8'>
      <input
        className='w-full border-b border-border p-3 sm:p-2 outline-none focus:border-primary'
        type='text'
        id='name'
        placeholder='Your name'
        aria-label='Your name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={submitting}
      />
      <input
        className='w-full border-b border-border p-3 sm:p-2 outline-none focus:border-primary'
        type='email'
        id='email'
        placeholder='Enter your email'
        aria-label='Your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={submitting}
      />
      <textarea
        rows={3}
        placeholder='Enter your message'
        id='message'
        className='w-full border-b border-border p-3 sm:p-2 outline-none resize-none focus:border-primary'
        aria-label='Your message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={submitting}
      />
      <Button
        type='submit'
        className='cursor-pointer mt-2 sm:mt-4 h-12 btn-primary font-bold w-full sm:w-auto disabled:opacity-70'
        size='lg'
        disabled={submitting}
      >
        {submitting ? 'Sending...' : 'Send your inquiry'}
      </Button>
    </form>
  )
}
