import Finished from '../Finished'
import Home from '../Home'

export default component => {
    const components = {
        home: Home,
        finished: Finished
    }

    return components[component]
}