import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'

import Input from './input'

describe('Layout', () => {
  it('has input item', () => {
    const { container } = render(<Input />)
    const input = container.querySelector('input')
    expect(input).toBeInTheDocument()
  })
  it('does not displays the label when no label provided in props', () => {
    const { container } = render(<Input />)
    const label = container.querySelector('label')
    expect(label).not.toBeInTheDocument()
  })
  it('has password type input when password is the props', () => {
    const { container } = render(<Input type='password' />)
    const input = container.querySelector('input')
    expect(input.type).toBe('password')
  })
  it('displays placeholder when provided as prop', () => {
    const { container } = render(<Input placeholder='placeholder' />)
    const input = container.querySelector('input')
    expect(input.placeholder).toBe('placeholder')
  })
  it('displays value when provided as prop', () => {
    const { container } = render(<Input value='test input' />)
    const input = container.querySelector('input')
    expect(input.value).toBe('test input')
  })
  it('has onChange callback when provided as prop', () => {
    const onChange = jest.fn()
    const { container } = render(<Input onChange={onChange} />)
    const input = container.querySelector('input')
    fireEvent.change(input, { target: { value: 'new-input' } })
    expect(onChange).toHaveBeenCalledTimes(1)
  })
  it('displays default style when there is no validation', () => {
    const { container } = render(<Input />)
    const input = container.querySelector('input')
    expect(input.className).toBe('form-control')
  })
  it('displays success style when there is no error', () => {
    const { container } = render(<Input hasError={false} />)
    const input = container.querySelector('input')
    expect(input.className).toBe('form-control is-valid')
  })
  it('displays error style when there is an error', () => {
    const { container } = render(<Input hasError={false} />)
    const input = container.querySelector('input')
    expect(input.className).toBe('form-control is-invalid')
  })
  it('displayes error text', () => {
    const { queryByText } = render(
      <Input hasError={true} error='Cannot be null' />
    )
    expect(queryByText('Cannot be null')).toBeInTheDocument()
  })
})
