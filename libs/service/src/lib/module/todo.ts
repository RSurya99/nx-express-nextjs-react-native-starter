import { TTodo } from '@nx-next-react-native-express/interface';
import { callApi } from "../callApi";

export function todoIndexService(){
  const path = '/todo'

  return callApi({
    path,
    options: {
      method: 'GET'
    }
  })
}

export function todoCreateService(payload: { title: string }){
  const path = '/todo'

  return callApi({
    path,
    options: {
      method: 'POST',
      body: JSON.stringify(payload)
    }
  })
}

export function todoUpdateService(id: string, payload: Partial<TTodo>){
  const path = '/todo/' + id

  return callApi({
    path,
    options: {
      method: 'PUT',
      body: JSON.stringify(payload)
    }
  })
}

export function todoDeleteService(id: string){
  const path = '/todo/' + id

  return callApi({
    path,
    options: {
      method: 'DELETE',
    }
  })
}
