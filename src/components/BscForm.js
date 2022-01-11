import {
    BscConnector
 } from '@binance-chain/bsc-connector'
 
 export const bsc = new BscConnector({
    supportedChainIds: [56, 97] // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
 })
 
 // invoke method on bsc e.g.
 await bsc.activate();
 await bsc.getAccount();
 await bsc.getChainId();

 function App() {
    const { account, connect, reset, status } = useWallet()
    return (
      <div>
        <h1>Binance Chain Connector</h1>
        {status === 'disconnected' ? (
          <button onClick={() => connect('bsc')}>Connect</button>
        ) : (
          <button onClick={() => reset()}>Disconnect</button>
        )}
        {account && <p>Connected as {account}</p>}
      </div>
    )
  }
  
  render(
    <UseWalletProvider
      connectors={{
        bsc: {
          web3ReactConnector() {
            return new BscConnector({ supportedChainIds: [56, 97] })
          },
          handleActivationError(err) {
            if (err instanceof UserRejectedRequestError) {
              return new ConnectionRejectedError()
            }
          },
        },
      }}
    >
    <App />
    </UseWalletProvider>,
    document.getElementById('root')
  )