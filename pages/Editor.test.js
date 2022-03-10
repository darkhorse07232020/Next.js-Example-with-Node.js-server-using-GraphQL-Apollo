import TestRenderer from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'
import Editor, { THE_MATRIX, UPDATE_MATRIX } from './Editor'

const mockData = [
   { id: 1, row: [3, 2], },
   { id: 2, row: [8, 9] },
   { id: 3, row: [54, 234234] },
]

describe('Editor', () => {
   it('render the right amount of rows', async () => {
      const mocks = [
         {
            request: {
               query: THE_MATRIX,
            },
            result: {
               data: {
                  matrix: mockData,
               }
            },
         },
      ]

      const component = TestRenderer.create(
         <MockedProvider mocks={mocks} addTypename={false}>
            <Editor />
         </MockedProvider>,
      )
      await new Promise(resolve => setTimeout(resolve, 100))
      const tree = component.toJSON()
      console.log('tree: ', tree);

      expect(tree.children.filter(item => item.type === 'div').length).toEqual(4)
   })

   it('render the right amount of columns', async () => {
      const mocks = [
         {
            request: {
               query: THE_MATRIX,
            },
            result: {
               data: {
                  matrix: mockData,
               }
            },
         },
      ]

      const component = TestRenderer.create(
         <MockedProvider mocks={mocks} addTypename={false}>
            <Editor />
         </MockedProvider>,
      )
      await new Promise(resolve => setTimeout(resolve, 100))
      const tree = component.toJSON()

      expect(tree.children[0].children.length).toEqual(3)
   })

   it('it should show a placeholder (simple text) if matrix has 0 columns and rows', async () => {
      const mocks = [
         {
            request: {
               query: THE_MATRIX,
            },
            result: {
               data: {
                  matrix: [],
               }
            },
         },
      ]

      const component = TestRenderer.create(
         <MockedProvider mocks={mocks} addTypename={false}>
            <Editor />
         </MockedProvider>,
      )
      await new Promise(resolve => setTimeout(resolve, 100))
      const tree = component.toJSON()

      expect(tree.children).toContain('Empty Data')
   })

   it('update successfully', async () => {
      const mocks = [
         {
            request: {
               query: THE_MATRIX,
            },
            result: {
               data: {
                  matrix: mockData,
               }
            },
         },
         {
            request: {
               query: UPDATE_MATRIX,
               variables: {
                  matrix: [[3,2],[8,9],[54,234234]]
               }
            },
            result: {
               data: {
                  "updateMatrix": true
               }
            },
         },
      ]

      const component = TestRenderer.create(
         <MockedProvider mocks={mocks} addTypename={false}>
            <Editor />
         </MockedProvider>,
      )
      await new Promise(resolve => setTimeout(resolve, 100))
      const button = component.root.findByType('button')
      button.props.onClick()

      await new Promise(resolve => setTimeout(resolve, 100))

      const tree = component.toJSON()

      expect(button.children).toContain('Updated!')
   })
})
