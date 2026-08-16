/**
 * useContactForm — controlled form state and validation for the
 * Brickleaf project intake form.
 *
 * Returns:
 *   form          — current field values
 *   errors        — per-field error strings
 *   handleField   — onChange handler for text inputs / textarea
 *   toggleType    — toggles a project-type string in the projectTypes array
 *   handleSubmit  — validates then calls the onSubmit prop with form data
 *   reset         — resets to initial state
 */
import { useState, useCallback } from 'react'

const INITIAL_STATE = {
  name:         '',
  email:        '',
  message:      '',
  projectTypes: [],
}

export function useContactForm(onSubmit) {
  const [form,   setForm]   = useState(INITIAL_STATE)
  const [errors, setErrors] = useState({})

  /** Updates a single text field and clears its error. */
  const handleField = useCallback((e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }, [])

  /** Adds or removes a project type from the array. */
  const toggleType = useCallback((type) => {
    setForm(prev => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(type)
        ? prev.projectTypes.filter(t => t !== type)
        : [...prev.projectTypes, type],
    }))
  }, [])

  /** Validates required fields; returns error map (empty = valid). */
  function validate() {
    const errs = {}
    if (!form.name.trim())    errs.name    = 'Name is required.'
    if (!form.email.trim())   errs.email   = 'Email is required.'
    if (!form.message.trim()) errs.message = 'Please describe your project.'
    return errs
  }

  /** Runs validation; on success calls the supplied onSubmit callback. */
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    // Placeholder — log to console; swap in real handler when backend is ready
    console.log('[Brickleaf] Form submitted:', form)
    if (typeof onSubmit === 'function') onSubmit(form)
    // Optionally reset after submission:
    // reset()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, onSubmit])

  const reset = useCallback(() => {
    setForm(INITIAL_STATE)
    setErrors({})
  }, [])

  return { form, errors, handleField, toggleType, handleSubmit, reset }
}
