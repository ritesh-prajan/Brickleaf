/**
 * useContactForm — controlled form state and validation for the
 * Brickleaf project intake form with initial values support.
 */
import { useState, useCallback, useEffect } from 'react'

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  message: '',
  projectTypes: [],
}

export function useContactForm(onSubmit, initialValues = null) {
  const [form, setForm] = useState(() => ({
    ...INITIAL_STATE,
    ...(initialValues || {}),
  }))
  const [errors, setErrors] = useState({})

  // Update if initialValues change
  useEffect(() => {
    if (initialValues) {
      setForm((prev) => ({
        ...prev,
        ...initialValues,
      }))
    }
  }, [initialValues])

  /** Updates a single text field and clears its error. */
  const handleField = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }, [])

  /** Adds or removes a project type from the array. */
  const toggleType = useCallback((type) => {
    setForm((prev) => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(type)
        ? prev.projectTypes.filter((t) => t !== type)
        : [...prev.projectTypes, type],
    }))
  }, [])

  /** Validates required fields; returns error map (empty = valid). */
  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email.trim()) errs.email = 'Email is required.'
    if (!form.message.trim()) errs.message = 'Please describe your project.'
    return errs
  }

  /** Runs validation; on success calls the supplied onSubmit callback. */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const errs = validate()
      if (Object.keys(errs).length) {
        setErrors(errs)
        return
      }
      console.log('[Brickleaf] Form submitted:', form)
      if (typeof onSubmit === 'function') onSubmit(form)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form, onSubmit]
  )

  const reset = useCallback(() => {
    setForm(INITIAL_STATE)
    setErrors({})
  }, [])

  return { form, errors, handleField, toggleType, handleSubmit, reset }
}
