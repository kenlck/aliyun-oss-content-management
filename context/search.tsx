import { createContext, Dispatch, useReducer } from 'react'

export type SearchContextType = {
  query: string
}

type Action = { type: 'update_query'; query: string } | { type: 'clear' }

const initialState: SearchContextType = {
  query: '',
}

export const SearchContext = createContext<{
  state: SearchContextType
  dispatch: Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => null,
})

const SearchProvider: React.FC = ({ children }) => {
  // const router = useRouter()
  // const [cookies, setCookies] = useCookie('company_code', '')
  // const stateL = useContext(LoaderContext)
  const initValue = initialState

  const [state, dispatch] = useReducer((state: SearchContextType, action: Action): SearchContextType => {
    switch (action.type) {
      case 'update_query': {
        return { ...state, query: action.query }
        break
      }
      case 'clear': {
        return { ...initialState }
        break
      }
      // case 'update_block_flag': {
      //   return { ...initialState, block_flag: action.block_flag }
      // }
      default:
        throw new Error()
    }
  }, initValue)

  const Provider = SearchContext.Provider

  return (
    <Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </Provider>
  )
}

export default SearchProvider
