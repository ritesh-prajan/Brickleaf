/**
 * ContactSection — layout orchestrator for the project intake form.
 *
 * Reads initial values from location.state if redirected from Chatbot or Gallery.
 */
import { useLocation } from 'react-router-dom'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import PanelDivider from './PanelDivider'
import { useContactForm } from '../../hooks/useContactForm'

export default function ContactSection({ onSubmit }) {
  const location = useLocation()
  const initialValues = location.state || null

  const { form, errors, handleField, toggleType, handleSubmit } =
    useContactForm(onSubmit, initialValues)

  return (
    <section
      id="contact-section"
      aria-labelledby="contact-heading"
      className="flex flex-col lg:flex-row w-full min-h-[90vh]"
    >
      <LeftPanel />
      <PanelDivider />
      <RightPanel
        form={form}
        errors={errors}
        handleField={handleField}
        toggleType={toggleType}
        handleSubmit={handleSubmit}
      />
    </section>
  )
}
