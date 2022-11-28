using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.JSInterop;
using System.Text.Json.Nodes;

namespace FYP1.Pages.BaseClasses
{
    public class IPFSBase: ComponentBase
    {
        [Inject]
        public IJSRuntime _jsRuntime { get; set; }
        private Lazy<Task<IJSObjectReference>> jsModuleTask;



        protected override void OnInitialized()
        {
            jsModuleTask = new(() => _jsRuntime.InvokeAsync<IJSObjectReference>("import", "./js/PinataInteractions.js").AsTask());
        }

        public async ValueTask DisposeAsync()
        {
            if (jsModuleTask.IsValueCreated)
            {
                var jsModule = await jsModuleTask.Value;
                await jsModule.DisposeAsync();
            }
        }

        public JsonObject _obj { get; set; }
        public async void PostDescToPINATA()
        {
            var jsModule = await jsModuleTask.Value;
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
            var jsModule = await jsModuleTask.Value;
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
    }
}
