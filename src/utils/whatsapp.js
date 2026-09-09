/**
 * WhatsApp Automation Engine for Brickleaf
 * Generates beautifully formatted, URL-encoded messages for studio inquiries.
 */

export const STUDIO_WHATSAPP_NUMBER = '919876543210' // Default studio contact number

/**
 * Builds a structured WhatsApp message string from intake form or chatbot data.
 */
export function buildWhatsAppMessage({
  name = '',
  email = '',
  phone = '',
  projectTypes = [],
  timeline = '',
  budget = '',
  message = '',
  source = 'Website Inquiry',
}) {
  const typesFormatted = Array.isArray(projectTypes) && projectTypes.length > 0
    ? projectTypes.join(', ')
    : 'Not Specified'

  const lines = [
    `*🏛️ BRICKLEAF — PROJECT INTAKE BRIEF*`,
    `_Source: ${source}_`,
    ``,
    `*👤 CLIENT DETAILS*`,
    `• *Name:* ${name || 'N/A'}`,
    `• *Phone:* ${phone || 'N/A'}`,
    `• *Email:* ${email || 'N/A'}`,
    ``,
    `*📐 PROJECT SCOPE*`,
    `• *Interest / Services:* ${typesFormatted}`,
  ]

  if (timeline) {
    lines.push(`• *Desired Timeline:* ${timeline}`)
  }

  if (budget) {
    lines.push(`• *Estimated Investment:* ${budget}`)
  }

  if (message) {
    lines.push(``, `*📝 PROJECT NOTES / VISION*`, `"${message}"`)
  }

  lines.push(``, `_Sent via Brickleaf Design Studio Interactive Portal_`)

  return lines.join('\n')
}

/**
 * Generates the full click-to-chat URL for WhatsApp.
 */
export function getWhatsAppUrl(data, phoneNumber = STUDIO_WHATSAPP_NUMBER) {
  const text = buildWhatsAppMessage(data)
  const encoded = encodeURIComponent(text)
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '')
  return `https://wa.me/${cleanNumber}?text=${encoded}`
}

/**
 * Directly triggers opening WhatsApp in a new tab.
 */
export function sendViaWhatsApp(data, phoneNumber = STUDIO_WHATSAPP_NUMBER) {
  const url = getWhatsAppUrl(data, phoneNumber)
  window.open(url, '_blank', 'noopener,noreferrer')
}
