namespace FYP1.Utils
{
    public static class StaticUtils
    {
        public static string PINATA_GATEWAY { get; private set; } = "https://gateway.pinata.cloud/ipfs";
        public static string RPC_URL { get; private set; } = "https://eth-goerli.g.alchemy.com/v2/QDm5sVnGSaCxhnkbdAhmunxVV0Gj1VBs";
        public static string ADDRESS { get; private set; } = "0x58E495b0d338485dd17a24938631a8577Ea5b768";
        public static string PINATA_API_KEY { get; private set; } = "f539be80f98cf35d1064";
        public static string PINATA_API_SECRET { get; private set; } = "41c4cc0b4e2fb88295a77369cd9ba135152fda9fcb93663aa037f8770cb37dab";
        public static string GOERLI_ETHERSCAN { get; private set; } = "https://goerli.etherscan.io/address";
    }
}
