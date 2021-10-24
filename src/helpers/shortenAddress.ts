const shortenAddress = (address: string) => `${address.substr(0, 4)}...${address.substr(-4)}`


export default shortenAddress
