import { style } from "@vanilla-extract/css";

export const wrapper = style({
   display: 'flex',
   flexDirection: 'column',
   width: 'fit-content',
   alignItems: 'center'
})

export const cell = style({
   padding: '.25rem',
   width: '5rem',
   margin: '.25rem',
})

export const headerCell = style({
   border: '2px solid transparent',
})

export const colHeader = style({
   padding: '.25rem',
   margin: '.25rem',
   width: '1rem',
})

export const rowContainer = style({
   display: 'flex',
})

export const button = style({
   padding: '.5rem',
   marginTop: '1rem',
   cursor: 'pointer'
})
