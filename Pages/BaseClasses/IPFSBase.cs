﻿using FYP1.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.JSInterop;
using Newtonsoft.Json;
using System.Text.Json.Nodes;
using FYP1.Utils;
namespace FYP1.Pages.BaseClasses
{
    public class IPFSBase: ComponentBase
    {
        [Inject]
        public IJSRuntime _jsRuntime { get; set; }
        private Lazy<Task<IJSObjectReference>> _pinataModule;
        private Lazy<Task<IJSObjectReference>> _blockChain;

        protected override void OnInitialized()
        {
            _pinataModule = new(() => _jsRuntime.InvokeAsync<IJSObjectReference>("import", "./js/PinataInteractions.js").AsTask());
            _blockChain = new(() => _jsRuntime.InvokeAsync<IJSObjectReference>("import", "./js/BlockchainInteractions.js").AsTask());
        }

        public async ValueTask DisposeAsync()
        {
            if (_pinataModule.IsValueCreated)
            {
                var jsModule = await _pinataModule.Value;
                await jsModule.DisposeAsync();
            }
        }

        public JsonObject _obj { get; set; }
        public async void PostDescToPINATA()
        {
            var jsModule = await _pinataModule.Value;
            try
            {
                _obj = await jsModule.InvokeAsync<JsonObject>("UploadDescoIPFS", "test to submit", "539be80f98cf35d1064", "41c4cc0b4e2fb88295a77369cd9ba135152fda9fcb93663aa037f8770cb37dab");
            }
            catch (Exception e)
            {
                var a = e;
            }
        }

        IList<IBrowserFile> files = new List<IBrowserFile>();
        public void UploadFiles(IBrowserFile file)
        {
            files.Add(file);
        }
        public async void PostImageToPINATA()
        {
            var file = files.FirstOrDefault();
            var jsModule = await _pinataModule.Value;
            try
            {
                await jsModule.InvokeVoidAsync("UploadFileToIPFS",file.Name.ToString(), file,"f539be80f98cf35d1064", "41c4cc0b4e2fb88295a77369cd9ba135152fda9fcb93663aa037f8770cb37dab");
                //var hash=_obj["pinataHASH"];
            }
            catch (Exception e)
            {
                var a = e;
            }
        }

       


        public async Task<List<Campagin>> GetAllCampaigns()
        {
            var jsModule = await _blockChain.Value;
            //try
            //{
            var list= await jsModule.InvokeAsync<List<Campagin>>("GetAllCompaignFuncJS",StaticUtils.ADDRESS, StaticUtils.RPC_URL);
            return list;
            //}
            //catch (Exception e)
            //{
            //    var a = e;
            //}
        }

        public async Task<Campagin> GetCampaginsByAddress(string address)
        {
            var jsModule = await _blockChain.Value;
            //try
            //{
            var campagin = await jsModule.InvokeAsync<Campagin>("GetUnitCompaignsByAddressFuncJS", StaticUtils.ADDRESS,address, StaticUtils.RPC_URL);
            return campagin;
            //}
            //catch (Exception e)
            //{
            //    var a = e;
            //}
        }
        public async Task<string> GetDescriptionFromPINATA(string hash)
        {
            var jsModule = await _pinataModule.Value;
            //try
            //{
            var desc = await jsModule.InvokeAsync<string>("GetDescriptionFromPinata", hash);
            Console.WriteLine("desc => " + desc);
            return desc;
            //}
            //catch (Exception e)
            //{
            //    var a = e;
            //}  
        }
        public async Task<List<Transaction>> GetTranactionsByAddress(string address)
        {
            var jsModule = await _blockChain.Value;
            //try
            //{
            var list = await jsModule.InvokeAsync<List<Transaction>>("GetCompaignTransactionsFuncJS", address, StaticUtils.RPC_URL);
            
            return list;
            //}
            //catch (Exception e)
            //{
            //    var a = e;
            //}
        }

        public async Task DonateFunc(double amount,string address)
        {
            var jsModule = await _blockChain.Value;
            //try
            //{
            await jsModule.InvokeVoidAsync("DonateFuncJS", address, amount);

            //}
            //catch (Exception e)
            //{
            //    var a = e;
            //}GetCompaignsByCategoryIndexFuncJS
        }

        public async Task<List<Campagin>> GetCampaignsByCategory(string category)
        {
            if (category == "ALL" || String.IsNullOrEmpty(category)) 
                return await GetAllCampaigns();

            var jsModule = await _blockChain.Value;
            //try
            //{
            var list = await jsModule.InvokeAsync<List<Campagin>>("GetCompaignsByCategoryIndexFuncJS", StaticUtils.ADDRESS,category, StaticUtils.RPC_URL);
            return list;
            //}
            //catch (Exception e)
            //{
            //    var a = e;
            //}
        }
    }
}