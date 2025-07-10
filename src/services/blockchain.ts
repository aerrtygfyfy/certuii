import { ethers } from 'ethers'

// Contract ABIs
export const FACTORY_ABI = [
  "function registerCompany(string memory _name, string memory _description, string memory _symbol) external",
  "function getCompany(address _owner) external view returns (tuple(address owner, address contractAddress, string name, string description, uint256 createdAt, bool isActive))",
  "function getCompanyContract(address _owner) external view returns (address)",
  "event CompanyRegistered(address indexed owner, address indexed contractAddress, string name)"
]

export const CERTIFICATE_ABI = [
  "function issueCertificate(address _recipient, string memory _recipientName, string memory _courseName, string memory _ipfsHash, bool _isPublic, bool _isSoulbound) external returns (uint256)",
  "function getCertificate(uint256 _tokenId) external view returns (tuple(uint256 tokenId, address recipient, string recipientName, string courseName, string ipfsHash, uint256 issueDate, bool isPublic, bool isSoulbound))",
  "function totalSupply() external view returns (uint256)",
  "function ownerOf(uint256 tokenId) external view returns (address)",
  "function tokenURI(uint256 tokenId) external view returns (string)",
  "event CertificateIssued(uint256 indexed tokenId, address indexed recipient, string recipientName, string courseName, string ipfsHash, bool isPublic, bool isSoulbound)"
]

// ABI pour le déploiement du contrat de certificats
export const CERTIFICATE_DEPLOY_ABI = [
  "constructor(string memory _name, string memory _symbol, string memory _companyName, string memory _description, address _owner)"
]

// Vous devez obtenir le bytecode de votre contrat compilé
// Voici un exemple de contrat simple - remplacez par votre vrai bytecode
export const CERTIFICATE_BYTECODE = `
0x608060405234801561001057600080fd5b50604051610d38380380610d3883398101604081905261002f9161007a565b8451610042906000906020880190610104565b508351610056906001906020870190610104565b50600280546001600160a01b0319166001600160a01b0392909216919091179055506101879050565b600080600080600060a0868803121561009257600080fd5b85516001600160401b03808211156100a957600080fd5b818801915088601f8301126100bd57600080fd5b8151818111156100cf576100cf610171565b604051601f8201601f19908116603f011681019083821181831017156100f7576100f7610171565b816040528281528b602084870101111561011057600080fd5b8260208601602083013760006020848301015280995050505050506020860151935060408601519250606086015191506080860151905092959194509250565b82805461015c906101a7565b90600052602060002090601f01602090048101928261017e57600085556101c4565b82601f1061019757805160ff19168380011785556101c4565b828001600101855582156101c4579182015b828111156101c45782518255916020019190600101906101a9565b506101d09291506101d4565b5090565b5b808211156101d057600081556001016101d5565b600181811c908216806101fb57607f821691505b6020821081141561021c57634e487b7160e01b600052602260045260246000fd5b50919050565b610ba2806102316000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80636352211e116100715780636352211e1461014357806370a082311461015657806395d89b4114610169578063a22cb46514610171578063b88d4fde14610184578063e985e9c51461019757600080fd5b806301ffc9a7146100ae57806306fdde03146100d6578063081812fc146100eb578063095ea7b31461011657806323b872dd1461012b575b600080fd5b6100c16100bc3660046108e0565b6101d3565b60405190151581526020015b60405180910390f35b6100de610225565b6040516100cd9190610955565b6100fe6100f9366004610968565b6102b7565b6040516001600160a01b0390911681526020016100cd565b6101296101243660046109a3565b610311565b005b6101296101393660046109cd565b610427565b6100fe610151366004610968565b610458565b6101296101643660046109a3565b6104cf565b6100de610569565b61012961017f366004610a09565b610578565b610129610192366004610a45565b610583565b6100c16101a5366004610b11565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061020457506001600160e01b03198216635b5e139f60e01b145b8061021f57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461023490610b44565b80601f016020809104026020016040519081016040528092919081815260200182805461026090610b44565b80156102ad5780601f10610282576101008083540402835291602001916102ad565b820191906000526020600020905b81548152906001019060200180831161029057829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166102f55760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061031c82610458565b9050806001600160a01b0316836001600160a01b031614156103975760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201526d391037b7363c9037b832b930ba37b960911b60648201526084016102ec565b336001600160a01b03821614806103b357506103b381336101a5565b6104255760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016102ec565b61042f83836105bb565b505050565b6104313382610629565b61044d5760405162461bcd60e51b81526004016102ec90610b7f565b61042f838383610720565b6000818152600260205260408120546001600160a01b03168061021f5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016102ec565b6000806104db83610458565b9050806001600160a01b0316846001600160a01b031614806105225750836001600160a01b031661050b846102b7565b6001600160a01b0316145b8061055257506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b60606001805461023490610b44565b61058233826105bb565b5050565b61058d3383610629565b6105a95760405162461bcd60e51b81526004016102ec90610b7f565b6105b5848484846108c0565b50505050565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906105f082610458565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b03166106a25760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016102ec565b60006106ad83610458565b9050806001600160a01b0316846001600160a01b031614806106e85750836001600160a01b03166106dd846102b7565b6001600160a01b0316145b8061055257506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff16949350505050565b826001600160a01b031661073382610458565b6001600160a01b0316146107975760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b60648201526084016102ec565b6001600160a01b0382166107f95760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016102ec565b6108046000826105bb565b6001600160a01b038316600090815260036020526040812080546001929061082d908490610bd0565b90915550506001600160a01b038216600090815260036020526040812080546001929061085b908490610be7565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6108cb848484610720565b6108d7848484846108f3565b6105b55760405162461bcd60e51b81526004016102ec90610bff565b505050565b60006001600160a01b0384163b156109f557604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610937903390899088908890600401610c51565b6020604051808303816000875af1925050508015610972575060408051601f3d908101601f1916820190925261096f91810190610c8e565b60015b6109cc573d8080156109a0576040519150601f19603f3d011682016040523d82523d6000602084013e6109a5565b606091505b5080516109c45760405162461bcd60e51b81526004016102ec90610bff565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610552565b506001949350505050565b6001600160e01b031981168114610a1657600080fd5b50565b600060208284031215610a2b57600080fd5b8135610a3681610a01565b9392505050565b60008060408385031215610a5057600080fd5b8235610a5b81610a18565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff80841115610a9a57610a9a610a69565b604051601f8501601f19908116603f01168101908282118183101715610ac257610ac2610a69565b81604052809350858152868686011115610adb57600080fd5b858560208301376000602087830101525050509392505050565b600082601f830112610b0657600080fd5b610a3683833560208501610a7f565b60008060408385031215610b2857600080fd5b8235610b3381610a18565b9150602083013561021f81610a18565b600181811c90821680610b5857607f821691505b60208210811415610b7957634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b600082821015610be257610be2610bba565b500390565b60008219821115610bfa57610bfa610bba565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090610c8490830184610c9b565b9695505050505050565b600060208284031215610ca057600080fd5b8151610a3681610a01565b60005b83811015610cc6578181015183820152602001610cae565b838111156105b55750506000910152565b60008151808452610cef816020860160208601610cab565b601f01601f19169290920160200192915050565b602081526000610a366020830184610cd7565b
`.trim()

// Si vous n'avez pas le bytecode complet, vous pouvez utiliser cette version basique
export const CERTIFICATE_BYTECODE_SIMPLE = "0x608060405234801561001057600080fd5b50..."; // Votre bytecode ici

// Factory contract addresses by network
export const FACTORY_ADDRESSES: Record<string, string> = {
  ethereum: import.meta.env.VITE_FACTORY_ADDRESS_ETHEREUM || '',
  sepolia: import.meta.env.VITE_FACTORY_ADDRESS_SEPOLIA || '',
  bsc: import.meta.env.VITE_FACTORY_ADDRESS_BSC || '',
  bscTestnet: import.meta.env.VITE_FACTORY_ADDRESS_BSC_TESTNET || '',
  polygon: import.meta.env.VITE_FACTORY_ADDRESS_POLYGON || '',
  polygonMumbai: import.meta.env.VITE_FACTORY_ADDRESS_POLYGON_MUMBAI || '',
}

// Network configurations
export const NETWORK_CONFIGS = {
  ethereum: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    blockExplorer: 'https://etherscan.io'
  },
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    symbol: 'ETH',
    rpcUrl: 'https://sepolia.infura.io/v3/',
    blockExplorer: 'https://sepolia.etherscan.io'
  },
  bsc: {
    chainId: 56,
    name: 'BNB Smart Chain',
    symbol: 'BNB',
    rpcUrl: 'https://bsc-dataseed1.binance.org/',
    blockExplorer: 'https://bscscan.com'
  },
  bscTestnet: {
    chainId: 97,
    name: 'BNB Smart Chain Testnet',
    symbol: 'BNB',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    blockExplorer: 'https://testnet.bscscan.com'
  },
  polygon: {
    chainId: 137,
    name: 'Polygon Mainnet',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon-rpc.com/',
    blockExplorer: 'https://polygonscan.com'
  },
  polygonMumbai: {
    chainId: 80001,
    name: 'Polygon Mumbai',
    symbol: 'MATIC',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    blockExplorer: 'https://mumbai.polygonscan.com'
  }
}

// Types
export interface CertificateData {
  contractAddress: string
  recipientAddress: string
  recipientName: string
  courseName: string
  ipfsHash: string
  isPublic?: boolean
  isSoulbound?: boolean
}

export interface Certificate {
  tokenId: string
  recipient: string
  recipientName: string
  courseName: string
  ipfsHash: string
  issueDate: string
  isPublic: boolean
  isSoulbound: boolean
}

export interface CompanyInfo {
  owner: string
  contractAddress: string
  name: string
  description: string
  createdAt: string
  isActive: boolean
}

export interface DeploymentResult {
  contractAddress: string
  transactionHash: string
  blockNumber: number
}

export class BlockchainService {
  private provider: ethers.BrowserProvider | ethers.providers.Web3Provider | null = null
  private signer: ethers.JsonRpcSigner | ethers.Signer | null = null

  constructor() {
    this.initializeProvider()
  }

  private async initializeProvider() {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      console.warn('No ethereum provider found in window')
      return
    }

    try {
      if (ethers.BrowserProvider) {
        this.provider = new ethers.BrowserProvider((window as any).ethereum)
      } else if (ethers.providers?.Web3Provider) {
        this.provider = new ethers.providers.Web3Provider((window as any).ethereum)
      } else {
        throw new Error('Unsupported ethers version')
      }
    } catch (error) {
      console.error('Failed to initialize provider:', error)
      throw error
    }
  }

  async getSigner(): Promise<ethers.JsonRpcSigner | ethers.Signer> {
    if (!this.provider) {
      throw new Error('No provider available')
    }

    try {
      if (this.provider instanceof ethers.BrowserProvider) {
        return await this.provider.getSigner()
      } else {
        return (this.provider as ethers.providers.Web3Provider).getSigner()
      }
    } catch (error) {
      console.error('Failed to get signer:', error)
      throw error
    }
  }

  async connectWallet(): Promise<string[]> {
    if (!this.provider) {
      throw new Error('No wallet provider found')
    }

    try {
      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts'
      })
      
      this.signer = await this.getSigner()
      return accounts
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      throw error
    }
  }

  async getAccount(): Promise<string | null> {
    try {
      if (!this.signer) {
        await this.connectWallet()
      }
      
      const signer = await this.getSigner()
      return await signer.getAddress()
    } catch (error) {
      console.error('Failed to get account:', error)
      return null
    }
  }

  async getNetwork(): Promise<{ chainId: number; name: string } | null> {
    if (!this.provider) return null

    try {
      const network = await this.provider.getNetwork()
      return {
        chainId: Number(network.chainId),
        name: network.name
      }
    } catch (error) {
      console.error('Failed to get network:', error)
      return null
    }
  }

  /**
   * Déploie un contrat de certificats avec le wallet client de wagmi
   */
  async deployCompanyContractWithWallet(
    companyName: string,
    description: string,
    symbol: string,
    blockchain: string,
    walletClient: any
  ): Promise<DeploymentResult> {
    try {
      // Créer un provider à partir du wallet client
      const provider = new ethers.BrowserProvider(walletClient)
      const signer = await provider.getSigner()
      const ownerAddress = await signer.getAddress()

      // Créer une factory de contrat avec le bytecode et l'ABI
      const contractFactory = new ethers.ContractFactory(
        CERTIFICATE_DEPLOY_ABI,
        CERTIFICATE_BYTECODE,
        signer
      )

      // Estimer le gas nécessaire
      const gasEstimate = await contractFactory.getDeployTransaction(
        companyName,
        symbol,
        companyName,
        description,
        ownerAddress
      ).then(tx => provider.estimateGas(tx))

      console.log('Gas estimate:', gasEstimate.toString())

      // Déployer le contrat
      const contract = await contractFactory.deploy(
        companyName,
        symbol,
        companyName,
        description,
        ownerAddress,
        {
          gasLimit: Math.floor(Number(gasEstimate) * 1.2) // 20% de marge
        }
      )

      console.log('Contract deployment transaction sent:', contract.deployTransaction?.hash)

      // Attendre la confirmation
      const receipt = await contract.deployTransaction?.wait()
      
      if (!receipt) {
        throw new Error('No deployment receipt received')
      }

      console.log('Contract deployed at:', contract.address)
      console.log('Transaction hash:', receipt.transactionHash)
      console.log('Block number:', receipt.blockNumber)

      return {
        contractAddress: contract.address,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber
      }
    } catch (error: any) {
      console.error('Contract deployment error:', error)
      
      // Améliorer les messages d'erreur
      if (error.code === 'INSUFFICIENT_FUNDS') {
        throw new Error('Fonds insuffisants pour le déploiement')
      } else if (error.code === 'USER_REJECTED') {
        throw new Error('Transaction annulée par l\'utilisateur')
      } else if (error.message?.includes('gas')) {
        throw new Error('Erreur de gas lors du déploiement')
      } else {
        throw new Error(error.message || 'Erreur lors du déploiement du contrat')
      }
    }
  }

  /**
   * Utilise un contrat factory pour déployer (alternative)
   */
  async deployViaFactory(
    companyName: string,
    description: string,
    symbol: string,
    blockchain: string
  ): Promise<any> {
    if (!this.provider || !this.signer) {
      throw new Error('Wallet not connected')
    }

    const factoryAddress = FACTORY_ADDRESSES[blockchain]
    if (!factoryAddress) {
      throw new Error('Factory contract not available for this network')
    }

    try {
      const signer = await this.getSigner()
      const factoryContract = new ethers.Contract(factoryAddress, FACTORY_ABI, signer)

      // Estimer le gas
      const gasEstimate = await factoryContract.registerCompany.estimateGas(
        companyName,
        description,
        symbol
      )

      // Exécuter la transaction
      const tx = await factoryContract.registerCompany(
        companyName,
        description,
        symbol,
        {
          gasLimit: Math.floor(Number(gasEstimate) * 1.2)
        }
      )

      console.log('Factory registration transaction sent:', tx.hash)

      // Attendre la confirmation
      const receipt = await tx.wait()
      
      // Écouter l'événement pour récupérer l'adresse du contrat déployé
      const events = receipt.events || []
      const companyRegisteredEvent = events.find(
        (event: any) => event.event === 'CompanyRegistered'
      )

      if (companyRegisteredEvent) {
        return {
          contractAddress: companyRegisteredEvent.args.contractAddress,
          transactionHash: receipt.transactionHash,
          blockNumber: receipt.blockNumber
        }
      } else {
        throw new Error('Could not find CompanyRegistered event in transaction receipt')
      }
    } catch (error: any) {
      console.error('Factory deployment error:', error)
      throw error
    }
  }

  async issueCertificate(data: CertificateData): Promise<any> {
    if (!this.provider || !this.signer) {
      throw new Error('Wallet not connected')
    }

    try {
      const signer = await this.getSigner()
      const certificateContract = new ethers.Contract(
        data.contractAddress,
        CERTIFICATE_ABI,
        signer
      )

      // Estimer le gas
      const gasEstimate = await certificateContract.issueCertificate.estimateGas(
        data.recipientAddress,
        data.recipientName,
        data.courseName,
        data.ipfsHash,
        data.isPublic ?? true,
        data.isSoulbound ?? false
      )

      // Exécuter la transaction
      const tx = await certificateContract.issueCertificate(
        data.recipientAddress,
        data.recipientName,
        data.courseName,
        data.ipfsHash,
        data.isPublic ?? true,
        data.isSoulbound ?? false,
        {
          gasLimit: Math.floor(Number(gasEstimate) * 1.2)
        }
      )

      console.log('Certificate issuance transaction sent:', tx.hash)

      // Attendre la confirmation
      const receipt = await tx.wait()
      
      // Récupérer l'événement pour obtenir le tokenId
      const events = receipt.events || []
      const certificateIssuedEvent = events.find(
        (event: any) => event.event === 'CertificateIssued'
      )

      if (certificateIssuedEvent) {
        return {
          tokenId: certificateIssuedEvent.args.tokenId.toString(),
          transactionHash: receipt.transactionHash,
          blockNumber: receipt.blockNumber
        }
      } else {
        throw new Error('Could not find CertificateIssued event in transaction receipt')
      }
    } catch (error: any) {
      console.error('Certificate issuance error:', error)
      throw error
    }
  }

  async getCertificateFromBlockchain(contractAddress: string, tokenId: string): Promise<Certificate> {
    if (!this.provider) {
      throw new Error('No provider available')
    }

    try {
      const contract = new ethers.Contract(contractAddress, CERTIFICATE_ABI, this.provider)
      const certificateData = await contract.getCertificate(tokenId)

      return {
        tokenId: certificateData.tokenId.toString(),
        recipient: certificateData.recipient,
        recipientName: certificateData.recipientName,
        courseName: certificateData.courseName,
        ipfsHash: certificateData.ipfsHash,
        issueDate: new Date(Number(certificateData.issueDate) * 1000).toISOString(),
        isPublic: certificateData.isPublic,
        isSoulbound: certificateData.isSoulbound
      }
    } catch (error) {
      console.error('Get certificate error:', error)
      throw error
    }
  }






  
  async switchNetwork(blockchain: string): Promise<void> {
    if (!this.provider || !(window as any).ethereum) {
      throw new Error('No wallet connected')
    }

    const config = NETWORK_CONFIGS[blockchain as keyof typeof NETWORK_CONFIGS]
    if (!config) {
      throw new Error('Unsupported network')
    }

    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${config.chainId.toString(16)}` }],
      })
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${config.chainId.toString(16)}`,
                chainName: config.name,
                nativeCurrency: {
                  name: config.symbol,
                  symbol: config.symbol,
                  decimals: 18,
                },
                rpcUrls: [config.rpcUrl],
                blockExplorerUrls: [config.blockExplorer],
              },
            ],
          })
        } catch (addError) {
          throw new Error('Failed to add network to wallet')
        }
      } else {
        throw new Error('Failed to switch network')
      }
    }
  }

  getBlockExplorerUrl(blockchain: string, hash: string, type: 'tx' | 'address' = 'tx'): string {
    const config = NETWORK_CONFIGS[blockchain as keyof typeof NETWORK_CONFIGS]
    if (!config) return ''
    
    const path = type === 'tx' ? 'tx' : 'address'
    return `${config.blockExplorer}/${path}/${hash}`
  }

  async getBalance(address?: string): Promise<string> {
    if (!this.provider) {
      throw new Error('No provider available')
    }

    try {
      const targetAddress = address || await this.getAccount()
      if (!targetAddress) {
        throw new Error('No address provided')
      }

      const balance = await this.provider.getBalance(targetAddress)
      return ethers.formatEther(balance)
    } catch (error) {
      console.error('Failed to get balance:', error)
      throw error
    }
  }

  async isConnected(): Promise<boolean> {
    try {
      const account = await this.getAccount()
      return !!account
    } catch (error) {
      return false
    }
  }

  disconnect(): void {
    this.provider = null
    this.signer = null
  }
}

export const blockchainService = new BlockchainService()