import { render, screen } from '@testing-library/react';
// import App from './App';
import { LayoutWrapper } from './components/index'
import renderer from 'react-test-renderer'

// test('sample test', () => {
//   render(<LayoutWrapper />);
//   // let tree = component.toJSON()
//   // screen.getByText
//   // const linkElement = screen.getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
// });


// import renderer from 'react-test-renderer'
// import { LayoutWrapper } from '../components/index'

it('Loads the quiz on click', () => {
  const component = renderer.create(<LayoutWrapper />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  // manually trigger the callback
  renderer.act(() => {
    tree.props.next()
  })
  // re-rendering
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  // manually trigger the callback
  renderer.act(() => {
    tree.props.resetQuiz()
  })
  // re-rendering
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  // manually trigger the callback
//   renderer.act(() => {
//     tree.props.onModeChange()
//   })
//   // re-rendering
//   tree = component.toJSON()
//   expect(tree).toMatchSnapshot()
})
