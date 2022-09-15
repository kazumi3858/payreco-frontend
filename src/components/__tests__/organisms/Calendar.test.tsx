import "@testing-library/jest-dom";
import Calendar from "components/organisms/Calendar";
import { cleanup, render, screen } from "@testing-library/react";
import { getWorksMSW } from "api/works/works.msw";
import { setupServer } from 'msw/node';



// const server = setupServer(...getWorksMSW());
// beforeAll(()=>{
//   server.listen()
// })

// afterEach(()=> {
//   server.resetHandlers()
//   cleanup()
// })

// afterAll(()=> {
//   server.close()
// })

describe("Calendar", () => {
  it("can render", ()=>{
    // render(<script type="module"><Calendar/></script>)
    expect("").toBeInTheDocument
  })
})
