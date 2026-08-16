/**
 * ContactSection — layout orchestrator for the project intake form.
 *
 * Owns the form state via useContactForm and passes props down to
 * LeftPanel and RightPanel. Renders the PanelDivider between them.
 *
 * Props:
 *   onSubmit — optional external handler called with form data on valid submit
 *              defaults to a console.log placeholder
 */
import LeftPanel     from './LeftPanel'
import RightPanel    from './RightPanel'
import PanelDivider  from './PanelDivider'
import { useContactForm } from '../../hooks/useContactForm'

export default function ContactSection({ onSubmit }) {
  const { form, errors, handleField, toggleType, handleSubmit } =
    useContactForm(onSubmit)

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
