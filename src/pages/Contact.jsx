import EditorialContact from '../components/contact/EditorialContact'
import { sendViaWhatsApp } from '../utils/whatsapp'

export default function Contact() {
  const handleSubmit = (data) => {
    console.log('[Brickleaf] Project brief received:', data)
    // Send automatically via WhatsApp as well if phone/info provided
    sendViaWhatsApp({
      source: 'Contact Page Submission',
      ...data,
    })
  }

  return <EditorialContact onSubmit={handleSubmit} />
}
