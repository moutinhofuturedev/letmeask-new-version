import { Home }  from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"
import { Room } from "./pages/Room"

import { Toaster } from "react-hot-toast"
import { AuthContextProvider } from "./contexts/AunthContext"
import { BrowserRouter ,Route, Switch } from 'react-router-dom'
import { AdminRoom } from "./pages/AdminRoom"

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home} /> {/* a propriedade exact está na condição true e não deixa que as páginas se misturem */}
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
          <Toaster />
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App

