import ContactSection from '../components/contact/ContactSection'

export default function Contact() {
  return (
    <ContactSection
      onSubmit={(data) => {
        // Placeholder — swap in real API call / WhatsApp handler here
        console.log('[Brickleaf] Project brief received:', data)
      }}
    />
  )
}
