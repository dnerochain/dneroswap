import { expect, test } from 'vitest'
import * as exports from './index'

test('exports', () => {
  expect(Object.keys(exports)).toMatchInlineSnapshot(`
    [
      "Client",
      "client",
      "createClient",
      "getClient",
      "getAccount",
      "watchAccount",
      "connect",
      "disconnect",
      "fetchBalance",
      "fetchFormattedBalance",
      "fetchAccountResources",
      "createAccountResourceFilter",
      "coinStoreResourcesFilter",
      "fetchAccountResource",
      "signMessage",
      "fetchAnsAddress",
      "fetchAnsName",
      "fetchTableItem",
      "PetraConnector",
      "Connector",
      "WalletAdapterNetwork",
      "noopStorage",
      "createStorage",
      "mainnet",
      "devnet",
      "testnet",
      "defaultChains",
      "defaultChain",
      "fetchCoin",
      "wrapCoinInfoTypeTag",
      "COIN_STORE_TYPE_PREFIX",
      "wrapCoinStoreTypeTag",
      "sendTransaction",
      "simulateTransaction",
      "isUserTransaction",
      "isPendingTransaction",
      "isAccountAddress",
      "isStructTag",
      "unwrapTypeFromString",
      "unwrapTypeArgFromString",
      "isHexStringEquals",
      "parseVmStatusError",
      "getProvider",
      "watchProvider",
      "getDefaultProviders",
      "fetchHealthy",
      "getNetwork",
      "watchNetwork",
      "fetchLedgerInfo",
      "ConnectorAlreadyConnectedError",
      "ConnectorNotFoundError",
      "ChainNotConfiguredError",
      "ChainMismatchError",
      "ConnectorUnauthorizedError",
      "SimulateTransactionError",
      "RpcError",
      "WalletProviderError",
      "UserRejectedRequestError",
      "APTOS_COIN",
      "APT",
    ]
  `)
})
