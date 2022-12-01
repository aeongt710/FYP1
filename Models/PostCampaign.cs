using Microsoft.AspNetCore.Components.Forms;
using System.ComponentModel.DataAnnotations;

namespace FYP1.Models
{
    public class PostCampaign
    {
        [Required]
        public string Title{ get; set; }
        [Required]
        [Range(0.1,10)]
        public double Amount { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public IBrowserFile ImgFile{ get; set; }


        public string? DescHash { get; set; }
        public string? ImgHash { get; set; }

        public string ImgClassGuid { get; set; } = "class"+Guid.NewGuid().ToString();

    }
}
