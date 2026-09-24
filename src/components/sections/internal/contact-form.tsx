'use client';

import {useRef, useState} from 'react';

type ContactLabels = Readonly<{
  name: string;
  email: string;
  phone: string;
  organisation: string;
  subject: string;
  message: string;
  send: string;
  required: string;
  invalidEmail: string;
}>;

type Props = Readonly<{labels: ContactLabels; address: string}>;
type Errors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>;
type FieldName = 'name' | 'email' | 'phone' | 'subject';

export function ContactForm({labels, address}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: Errors = {};
    const requiredFields = ['name', 'email', 'subject', 'message'] as const;
    requiredFields.forEach((field) => { if (!String(data.get(field) ?? '').trim()) nextErrors[field] = labels.required; });
    const email = String(data.get('email') ?? '').trim();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = labels.invalidEmail;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    const body = [
      `${labels.name}: ${data.get('name')}`,
      `${labels.email}: ${email}`,
      `${labels.phone}: ${data.get('phone') || '—'}`,
      `${labels.organisation}: ${data.get('organisation') || '—'}`,
      '', String(data.get('message')),
    ].join('\n');
    window.location.href = `mailto:${address}?subject=${encodeURIComponent(String(data.get('subject')))}&body=${encodeURIComponent(body)}`;
  };

  const field = (name: FieldName, label: string, type = 'text') => {
    const error = errors[name as keyof Errors];
    return <label className="contact-field" htmlFor={`contact-${name}`}>
    <span>{label}</span>
    <input id={`contact-${name}`} name={name} type={type} aria-invalid={Boolean(error)} aria-describedby={error ? `contact-${name}-error` : undefined} />
    {error && <small id={`contact-${name}-error`}>{error}</small>}
  </label>;
  };

  return <form ref={formRef} noValidate onSubmit={submit} className="contact-form">
    <div className="contact-form-grid">
      {field('name', labels.name)}
      {field('email', labels.email, 'email')}
      {field('phone', labels.phone, 'tel')}
      <label className="contact-field" htmlFor="contact-organisation"><span>{labels.organisation}</span><input id="contact-organisation" name="organisation" /></label>
      {field('subject', labels.subject)}
      <label className="contact-field contact-field--full" htmlFor="contact-message"><span>{labels.message}</span><textarea id="contact-message" name="message" rows={6} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} />
        {errors.message && <small id="contact-message-error">{errors.message}</small>}</label>
    </div>
    <button type="submit" className="button button--primary mt-6">{labels.send}</button>
  </form>;
}
