﻿using MetaMask.Blazor;
using Microsoft.AspNetCore.Components.Authorization;
using MudBlazor;
using System.Security.Claims;

namespace FYP1.Auth
{
    public class CustomAuthenticationProvider : AuthenticationStateProvider
    {
        public IMetaMaskService _metaMaskService { get; set; }
        public CustomAuthenticationProvider(IMetaMaskService MetaMaskService)
        {
            _metaMaskService = MetaMaskService;
        }
        public async override Task<AuthenticationState> GetAuthenticationStateAsync()
        {
            var connected = await _metaMaskService.IsSiteConnected();
            if(connected)
            {
                var chain=await _metaMaskService.GetSelectedChain();
                if(chain.chain.ToString()!= "Goerli")
                    throw new Exception("Connect to Goerli ETH Network!");

                var address =await  _metaMaskService.GetSelectedAddress();
                List<Claim> claims = new List<Claim>()
                {
                    new Claim("address",address),
                    new Claim("chain",chain.chain.ToString())
                };
                var userClaimPrincipal = new ClaimsPrincipal(new ClaimsIdentity(claims, "Authentication Passed") { });
                var loginUser = new AuthenticationState(userClaimPrincipal);
                return loginUser;
            }
            return new AuthenticationState(new ClaimsPrincipal(new ClaimsIdentity() { }));
        }
        public async Task Notify()
        {
            if (!(await _metaMaskService.HasMetaMask()))
                throw new Exception($"Please intstall Metamask!");

            await _metaMaskService.ConnectMetaMask();
            var chain = await _metaMaskService.GetSelectedChain();
            if (chain.chain.ToString() != "Goerli")
                throw new Exception("Connect to Goerli ETH Network!");


            NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
        }
        public async void NotifyNoAuth()
        {
            NotifyAuthenticationStateChanged(GetNoAUTHState());
        }
        public async Task<AuthenticationState> GetNoAUTHState()
        {
            return new AuthenticationState(new ClaimsPrincipal(new ClaimsIdentity() { }));
        }
    }
}
