using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;
using System.Web;
using System.Web.Services;
using PdfSharp;
using PdfSharp.Drawing;
using PdfSharp.Pdf;
using PdfSharp.Pdf.IO;
using PdfSharp.Drawing.Layout;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Drawing;
using System.Threading;
using System.IO;
using System.Xml.Linq;
using NPOI;
using NPOI.HSSF.Model;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;


[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
public class PDFEmailer : System.Web.Services.WebService
{
    //,
    //    string ImageDataURL,
    //    string LogoDataURl

    public PDFEmailer()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public void createPDF(
        Dictionary<string, string> UserDetails,
        Dictionary<string, string[]> OrderDetails,
        Dictionary<string, string> Fabric,
        Dictionary<string, string> Color,
        Dictionary<string, string> HiVi,
        Dictionary<string, string> Reflectors,
        Dictionary<string, string> Pockets,
        Dictionary<string, string> Optionals,
        Dictionary<string, string[]> Logo
        )
    {

        int orderNo = getOrderNumber();

        //checkAndDelete(false);

        //createImage(ImageDataURL);
        //CreateLogo(LogoDataURl);
        
        using (PdfDocument document = new PdfDocument())
        {



            document.Info.Title = "Test Document";

            PdfPage page = document.AddPage();
            page.Size = PageSize.A4;

            XGraphics gfx = XGraphics.FromPdfPage(page);

            gfx.DrawImage(XImage.FromFile(HttpContext.Current.Server.MapPath("~/") + "PDF/FirstPage.jpg"), 0, 0, page.Width, page.Height);


            page = document.AddPage();
            page.Size = PageSize.A4;
            gfx = XGraphics.FromPdfPage(page);
            gfx.DrawImage(XImage.FromFile(HttpContext.Current.Server.MapPath("~/") + "PDF/SVGPage.jpg"), 0, 0, page.Width, page.Height);
            using (var img = Image.FromFile(HttpContext.Current.Server.MapPath("~/") + "PDF/Temporary/Customized_Product.png"))
            {
                gfx.DrawImage(img, 0, 80, page.Width, page.Height - 160);
            }




            page = document.AddPage();
            page.Size = PageSize.A4;
            gfx = XGraphics.FromPdfPage(page);
            gfx.DrawImage(XImage.FromFile(HttpContext.Current.Server.MapPath("~/") + "PDF/InfoPage.jpg"), 0, 0, page.Width, page.Height);

            XFont HeaderFont = new XFont("Gill Sans MT", 18, XFontStyle.Bold);
            XFont TopTextfont = new XFont("Gill Sans MT", 12, XFontStyle.Regular);
            XFont BottomHeadersfont = new XFont("Gill Sans MT", 8, XFontStyle.Regular);
            XFont footerFont = new XFont("Gill Sans MT", 15, XFontStyle.Regular);

            int CompanyNameYPoint = 80;

            gfx.DrawString(UserDetails["CompanyName"], HeaderFont, XBrushes.Red, new XPoint(20, CompanyNameYPoint));

            gfx.DrawString("ORDER: ", TopTextfont, XBrushes.White, new XPoint(20, CompanyNameYPoint + 12));
            gfx.DrawString(orderNo.ToString(), TopTextfont, XBrushes.White, new XPoint(70, CompanyNameYPoint + 12));

            gfx.DrawString("DELIVERY DATE ", TopTextfont, XBrushes.Gray, new XPoint(20, CompanyNameYPoint + 40));
            gfx.DrawString(UserDetails["DeliveryDate"] == "" ? "N/A" : UserDetails["DeliveryDate"], TopTextfont, XBrushes.White, new XPoint(20, CompanyNameYPoint + 50));

            gfx.DrawString("DELIVERY", TopTextfont, XBrushes.Gray, new XPoint(20, CompanyNameYPoint + 70));
            gfx.DrawString(UserDetails["City"] == "" ? "N/A" : UserDetails["City"], TopTextfont, XBrushes.White, new XPoint(20, CompanyNameYPoint + 80));

            gfx.DrawString("YOUR ORDER ENQUIRY", HeaderFont, XBrushes.White, new XPoint(20, CompanyNameYPoint + 145));



            #region Order Sizes Section
            Dictionary<string, int> sizes = new Dictionary<string, int>();
            sizes["XS"] = 0;
            sizes["S"] = 0;
            sizes["M"] = 0;
            sizes["L"] = 0;
            sizes["XL"] = 0;
            sizes["XXL"] = 0;
            sizes["XXXL"] = 0;
            sizes["XXXXL"] = 0;
            sizes["XXXXXL"] = 0;
            sizes["total"] = 0;


            if (OrderDetails.Count > 0)
            {
                if (OrderDetails["orderedSizes"] != null && OrderDetails["orderedQuatities"] != null)
                {
                    for (int i = 0; i < OrderDetails["orderedSizes"].Length; i++)
                    {
                        if (OrderDetails["orderedSizes"][i] == null || OrderDetails["orderedQuatities"][i] == null)
                            continue;

                        sizes["total"] += Convert.ToInt32(OrderDetails["orderedQuatities"][i]);
                        sizes[OrderDetails["orderedSizes"][i]] = Convert.ToInt32(OrderDetails["orderedQuatities"][i]);
                    }
                }
            }


            int SizesY = 250;
            gfx.DrawString("XS", TopTextfont, XBrushes.White, new XPoint(45, SizesY));
            gfx.DrawString("S", TopTextfont, XBrushes.White, new XPoint(110, SizesY));
            gfx.DrawString("M", TopTextfont, XBrushes.White, new XPoint(170, SizesY));
            gfx.DrawString("L", TopTextfont, XBrushes.White, new XPoint(235, SizesY));
            gfx.DrawString("XL", TopTextfont, XBrushes.White, new XPoint(290, SizesY));
            gfx.DrawString("XXL", TopTextfont, XBrushes.White, new XPoint(355, SizesY));
            gfx.DrawString("XXXL", TopTextfont, XBrushes.White, new XPoint(405, SizesY));
            gfx.DrawString("XXXXL", TopTextfont, XBrushes.White, new XPoint(465, SizesY));
            gfx.DrawString("XXXXXL", TopTextfont, XBrushes.White, new XPoint(520, SizesY));


            gfx.DrawString(sizes["XS"].ToString(), TopTextfont, XBrushes.Red, new XPoint(45, SizesY + 23));
            gfx.DrawString(sizes["S"].ToString(), TopTextfont, XBrushes.Red, new XPoint(105, SizesY + 23));
            gfx.DrawString(sizes["M"].ToString(), TopTextfont, XBrushes.Red, new XPoint(165, SizesY + 23));
            gfx.DrawString(sizes["L"].ToString(), TopTextfont, XBrushes.Red, new XPoint(230, SizesY + 23));
            gfx.DrawString(sizes["XL"].ToString(), TopTextfont, XBrushes.Red, new XPoint(290, SizesY + 23));
            gfx.DrawString(sizes["XXL"].ToString(), TopTextfont, XBrushes.Red, new XPoint(355, SizesY + 23));
            gfx.DrawString(sizes["XXXL"].ToString(), TopTextfont, XBrushes.Red, new XPoint(415, SizesY + 23));
            gfx.DrawString(sizes["XXXXL"].ToString(), TopTextfont, XBrushes.Red, new XPoint(475, SizesY + 23));
            gfx.DrawString(sizes["XXXXXL"].ToString(), TopTextfont, XBrushes.Red, new XPoint(535, SizesY + 23));

            gfx.DrawString("TOTAL QUANTITY", TopTextfont, XBrushes.Gray, new XPoint(20, SizesY + 50));
            gfx.DrawString(sizes["total"].ToString() + " units", TopTextfont, XBrushes.White, new XPoint(20, SizesY + 62));
            #endregion


            int DateY = 380;
            gfx.DrawString("DATE CREATED: " + DateTime.Now.ToString("dd.MM.yyyy"), TopTextfont, XBrushes.Gray, new XPoint(20, DateY));

            #region All specs headers
            XTextFormatter tf = new XTextFormatter(gfx);
            XRect rect = new XRect(30, DateY + 12, 90, 80);
            gfx.DrawRectangle(XBrushes.Transparent, rect);
            tf.LayoutRectangle = rect;
            tf.Alignment = XParagraphAlignment.Left;
            tf.DrawString("HIGHEST LEVEL OF COMFORT DUE TO ITS BREATHABILITY AND AMAZING SWEAT ABSORPTION", BottomHeadersfont, XBrushes.White, rect, XStringFormats.TopLeft);




            rect = new XRect(140, DateY + 12, 90, 80);
            gfx.DrawRectangle(XBrushes.Transparent, rect);
            tf.LayoutRectangle = rect;
            tf.Alignment = XParagraphAlignment.Left;
            tf.DrawString("WITH OUR PROTAL FABRIC, ANY COLOUR FRAGMENT CAN BE MADE.", BottomHeadersfont, XBrushes.White, rect, XStringFormats.TopLeft);

            rect = new XRect(255, DateY + 12, 90, 80);
            gfx.DrawRectangle(XBrushes.Transparent, rect);
            tf.LayoutRectangle = rect;
            tf.Alignment = XParagraphAlignment.Left;
            tf.DrawString("FR GARMENT WITH PROTECTIVE VALUE INLINE WITH EU AND INTERNATIONAL CERTIFICATION.", BottomHeadersfont, XBrushes.White, rect, XStringFormats.TopLeft);

            rect = new XRect(365, DateY + 12, 90, 80);
            gfx.DrawRectangle(XBrushes.Transparent, rect);
            tf.LayoutRectangle = rect;
            tf.Alignment = XParagraphAlignment.Left;
            tf.DrawString("MANUFACTURED IN DUBAI WITH SHORT LEAD TIMES AND OUR LOW MINIMUM QUANTITIES.", BottomHeadersfont, XBrushes.White, rect, XStringFormats.TopLeft);

            rect = new XRect(480, DateY + 12, 90, 80);
            gfx.DrawRectangle(XBrushes.Transparent, rect);
            tf.LayoutRectangle = rect;
            tf.Alignment = XParagraphAlignment.Left;
            tf.DrawString("QUALITY DESIGN AND MANUFACTURE IN EVERY DETAIL FOR ULTIMATE HIGH PERFORMANCE.", BottomHeadersfont, XBrushes.White, rect, XStringFormats.TopLeft);

            XFont NumbersFont = new XFont("Gill Sans MT", 36, XFontStyle.Bold);

            gfx.DrawString("1", NumbersFont, XBrushes.White, new XPoint(105, DateY + 100));
            gfx.DrawString("2", NumbersFont, XBrushes.White, new XPoint(215, DateY + 100));
            gfx.DrawString("3", NumbersFont, XBrushes.White, new XPoint(325, DateY + 100));
            gfx.DrawString("4", NumbersFont, XBrushes.White, new XPoint(435, DateY + 100));
            gfx.DrawString("5", NumbersFont, XBrushes.White, new XPoint(545, DateY + 100));


            int HeadersY = 505;

            gfx.DrawString("FABRIC SPECS", BottomHeadersfont, XBrushes.White, new XPoint(50, HeadersY));
            gfx.DrawString("OPTIONALS SPECS", BottomHeadersfont, XBrushes.White, new XPoint(150, HeadersY));
            gfx.DrawString("HI-VI SPECS", BottomHeadersfont, XBrushes.White, new XPoint(275, HeadersY));
            gfx.DrawString("POCKET SPECS", BottomHeadersfont, XBrushes.White, new XPoint(385, HeadersY));
            gfx.DrawString("REFLECTORS SPECS", BottomHeadersfont, XBrushes.White, new XPoint(485, HeadersY));

            #endregion

            #region Fabrics Specifications

            gfx.DrawString(Fabric["fabric"].ToString(), BottomHeadersfont, XBrushes.White, new XPoint(30, HeadersY + 20));
            gfx.DrawString("GSM: ", BottomHeadersfont, XBrushes.White, new XPoint(30, HeadersY + 30));
            gfx.DrawString(Fabric["GSM"].ToString(), BottomHeadersfont, XBrushes.Gray, new XPoint(50, HeadersY + 30));

            #endregion

            #region Optionals Specifications
            int FlexibleY = HeadersY + 20;
            if (Optionals["mainClosing"].ToString() != "")
            {
                gfx.DrawString("Main Closing", BottomHeadersfont, XBrushes.White, new XPoint(140, FlexibleY));
                gfx.DrawString(Optionals["mainClosing"].ToString(), BottomHeadersfont, XBrushes.Gray, new XPoint(140, FlexibleY + 10));
                FlexibleY += 25;
            }

            if (Optionals["nameOption"].ToString() != "")
            {
                gfx.DrawString("Name Option", BottomHeadersfont, XBrushes.White, new XPoint(140, FlexibleY));
                gfx.DrawString(Optionals["nameOption"].ToString(), BottomHeadersfont, XBrushes.Gray, new XPoint(140, FlexibleY + 10));
                FlexibleY += 25;
            }

            if (Optionals["HSEBadge"].ToString() != "")
            {
                gfx.DrawString("Corporate HSE Badge", BottomHeadersfont, XBrushes.White, new XPoint(140, FlexibleY));
                gfx.DrawString(Optionals["HSEBadge"].ToString(), BottomHeadersfont, XBrushes.Gray, new XPoint(140, FlexibleY + 10));
                FlexibleY += 25;
            }

            if (Optionals["gasLoop"].ToString() != "")
            {
                gfx.DrawString("Gas Loops", BottomHeadersfont, XBrushes.White, new XPoint(140, FlexibleY));
                gfx.DrawString(Optionals["gasLoop"].ToString(), BottomHeadersfont, XBrushes.Gray, new XPoint(140, FlexibleY + 10));
                FlexibleY += 25;
            }

            if (Optionals["FlagIcon"].ToString() != "")
            {
                gfx.DrawString("Flag", BottomHeadersfont, XBrushes.White, new XPoint(140, FlexibleY));
                gfx.DrawString(Optionals["FlagIcon"].ToString(), BottomHeadersfont, XBrushes.Gray, new XPoint(140, FlexibleY + 10));
                FlexibleY += 25;
            }

            if (Optionals["ShoulderEpaulet"].ToString() != "")
            {
                gfx.DrawString("Shoulder Epaulet", BottomHeadersfont, XBrushes.White, new XPoint(140, FlexibleY));
                gfx.DrawString(Optionals["ShoulderEpaulet"].ToString(), BottomHeadersfont, XBrushes.Gray, new XPoint(140, FlexibleY + 10));
                FlexibleY += 25;
            }

            if (Optionals["Collar"].ToString() != "")
            {
                gfx.DrawString("Collar", BottomHeadersfont, XBrushes.White, new XPoint(140, FlexibleY));
                gfx.DrawString(Optionals["Collar"].ToString(), BottomHeadersfont, XBrushes.Gray, new XPoint(140, FlexibleY + 10));
                FlexibleY += 25;
            }

            if (Optionals["FRIcon"].ToString() != "")
            {
                gfx.DrawString("FR Icon Option", BottomHeadersfont, XBrushes.White, new XPoint(140, FlexibleY));
                gfx.DrawString(Optionals["FRIcon"].ToString(), BottomHeadersfont, XBrushes.Gray, new XPoint(140, FlexibleY + 10));
                FlexibleY += 25;
            }

            if (Convert.ToBoolean(Optionals["KneeEnforcement"]))
            {
                gfx.DrawString("Knee Enforcement", BottomHeadersfont, XBrushes.White, new XPoint(140, FlexibleY));
                FlexibleY += 25;
            }

            if (Convert.ToBoolean(Optionals["KneePad"]))
            {
                gfx.DrawString("Knee Pad", BottomHeadersfont, XBrushes.White, new XPoint(140, FlexibleY));
                FlexibleY += 25;
            }

            if (Convert.ToBoolean(Optionals["ElbowEnforcement"]))
            {
                gfx.DrawString("Elbow Enforcement", BottomHeadersfont, XBrushes.White, new XPoint(140, FlexibleY));
                FlexibleY += 25;
            }

            if (Optionals["winter"].ToString() != "")
            {
                gfx.DrawString("Winter Insulation", BottomHeadersfont, XBrushes.White, new XPoint(140, FlexibleY));
                gfx.DrawString(Optionals["winter"].ToString(), BottomHeadersfont, XBrushes.Gray, new XPoint(140, FlexibleY + 10));
            }

            #endregion

            #region Hi-Vi Specifications section

            FlexibleY = HeadersY + 20;
            if (HiVi["Placement"].ToString() != "none" && HiVi["Placement"].ToString() != "")
            {
                gfx.DrawString("Placement", BottomHeadersfont, XBrushes.White, new XPoint(260, FlexibleY));
                gfx.DrawString(HiVi["Placement"].ToString(), BottomHeadersfont, XBrushes.Gray, new XPoint(260, FlexibleY + 10));
                gfx.DrawString("HI-VI Color:", BottomHeadersfont, XBrushes.White, new XPoint(260, FlexibleY + 40));
                gfx.DrawString(HiVi["color"].ToString(), BottomHeadersfont, XBrushes.Gray, new XPoint(260, FlexibleY + 50));
            }

            #endregion

            #region Pockets Specifications

            FlexibleY = HeadersY + 20;

            if (Pockets["bodyPlacement"].ToString() != "" && Pockets["bodyPlacement"].ToString() != "none")
            {
                gfx.DrawString(Pockets["bodyPlacement"].ToString(), BottomHeadersfont, XBrushes.White, new XPoint(370, FlexibleY));
                gfx.DrawString(Pockets["BodyClosing"].ToString() + " Closing", BottomHeadersfont, XBrushes.Gray, new XPoint(370, FlexibleY + 10));
                FlexibleY += 30;
            }

            if (Pockets["armsPlacement"].ToString() != "" && Pockets["armsPlacement"].ToString() != "none")
            {
                gfx.DrawString(Pockets["armsPlacement"].ToString(), BottomHeadersfont, XBrushes.White, new XPoint(370, FlexibleY));
                FlexibleY += 30;
            }

            if (Pockets["cargoPlacement"].ToString() != "" && Pockets["cargoPlacement"].ToString() != "none")
            {
                gfx.DrawString(Pockets["cargoPlacement"].ToString(), BottomHeadersfont, XBrushes.White, new XPoint(370, FlexibleY));
                gfx.DrawString(Pockets["CargoClosing"].ToString() + " Closing", BottomHeadersfont, XBrushes.Gray, new XPoint(370, FlexibleY + 10));
                FlexibleY += 30;
            }

            if (Pockets["backPocketPlacement"].ToString() != "" && Pockets["backPocketPlacement"].ToString() != "none")
            {
                gfx.DrawString(Pockets["backPocketPlacement"].ToString(), BottomHeadersfont, XBrushes.White, new XPoint(370, FlexibleY));
                gfx.DrawString(Pockets["backPocketClosing"].ToString() + " Closing", BottomHeadersfont, XBrushes.Gray, new XPoint(370, FlexibleY + 10));
            }

            #endregion

            #region Reflectors Specifications

            FlexibleY = HeadersY + 20;
            gfx.DrawString("Reflector Type", BottomHeadersfont, XBrushes.White, new XPoint(480, FlexibleY));
            gfx.DrawString(Reflectors["reflectorType"].ToString() + " " + Reflectors["reflectorColor"], BottomHeadersfont, XBrushes.Gray, new XPoint(480, FlexibleY + 10));
            FlexibleY += 30;

            if (Reflectors["body"].ToString() != "" && Reflectors["body"].ToString() != "none")
            {
                gfx.DrawString("Body", BottomHeadersfont, XBrushes.White, new XPoint(480, FlexibleY));
                gfx.DrawString(Reflectors["body"].ToString(), BottomHeadersfont, XBrushes.Gray, new XPoint(480, FlexibleY + 10));
                FlexibleY += 30;
            }


            if (Reflectors["arms"].ToString() != "" && Reflectors["arms"].ToString() != "none")
            {
                gfx.DrawString("Arms", BottomHeadersfont, XBrushes.White, new XPoint(480, FlexibleY));
                gfx.DrawString(Reflectors["arms"].ToString(), BottomHeadersfont, XBrushes.Gray, new XPoint(480, FlexibleY + 10));
                FlexibleY += 30;
            }



            if (Reflectors["legs"].ToString() != "" && Reflectors["legs"].ToString() != "none")
            {
                gfx.DrawString("Legs", BottomHeadersfont, XBrushes.White, new XPoint(480, FlexibleY));
                gfx.DrawString(Reflectors["legs"].ToString(), BottomHeadersfont, XBrushes.Gray, new XPoint(480, FlexibleY + 10));
            }


            #endregion




            page = document.AddPage();
            page.Size = PageSize.A4;
            gfx = XGraphics.FromPdfPage(page);
            gfx.DrawImage(XImage.FromFile(HttpContext.Current.Server.MapPath("~/") + "PDF/LastPage.jpg"), 0, 0, page.Width, page.Height);
            tf = new XTextFormatter(gfx);
            rect = new XRect(40, 100, 300, 500);
            tf.LayoutRectangle = rect;
            tf.Alignment = XParagraphAlignment.Left;
            tf.DrawString(
                @"Thank you for creating your Silver Red Garment! 

Here at Silver Red we are equipped with all the experience and technical know-how to find a fitted garment for your work environment. 

To avoid double work and miscommunication your technical drawings and item details will be stored in our database. This also means that you can ask for an extra drawing or sample of this particular item anytime of the year. 

If you need any help with our customizer or simply have some questions or remarks; please contact us. Our client representatives are looking forward to assist you with any possible query regarding your garments. 

You can contact us via Sales@silver-red.com or give us a call on +971 (0) 4 801 9043 

To find out more about the Most Comfortable Work Wear in the MEA region, visit us at www.silver-red.com


Accidents Hurt, Safety Doesn’t 


Jules Scholten 
Head of Business Development ",
                footerFont, XBrushes.White, rect, XStringFormats.TopLeft);



            const string filename = "Customized_Product.pdf";
            document.Save(HttpContext.Current.Server.MapPath("~/") + "PDF/Temporary/" + filename);


            //string theProduct = UserDetails["theProduct"].ToString();

            //if (theProduct == "Coverall")
            createCoverallExcel(orderNo, Fabric, Color, HiVi, Reflectors, Pockets, Optionals, Logo, sizes, UserDetails["DeliveryDate"].ToString());


            


        }

        //bool hasQotation = (OrderDetails.Count > 0);
        //bool hasLogo = UserDetails["hasLogo"] == null ? false : Convert.ToBoolean(UserDetails["hasLogo"]);

        //SendMail(hasLogo, UserDetails, hasQotation);

        //UpdateOrderNumber(orderNo);

        //checkAndDelete(true);
       
    }









    [WebMethod]
    public void CreateLogo(string LogoDataURl)
    {
        if (LogoDataURl != "" && LogoDataURl != "none")
        {
            string CodeToConvert = LogoDataURl.Replace("data:image/png;base64,", "");
            Byte[] bitmapData = new Byte[CodeToConvert.Length];
            bitmapData = Convert.FromBase64String(CodeToConvert);
            System.IO.MemoryStream streamBitmap = new System.IO.MemoryStream(bitmapData);
            Bitmap bitImage = new Bitmap((Bitmap)Image.FromStream(streamBitmap));
            bitImage.Save(HttpContext.Current.Server.MapPath("~/") + "PDF/Temporary/Logo.png", System.Drawing.Imaging.ImageFormat.Png);
            bitImage.Dispose();
        }
    }

    [WebMethod]
    public void createImage(string ImageDataURL)
    {
        checkAndDelete(false);
        string BaseString = ImageDataURL.Replace("data:image/png;base64,", "");
        Byte[] bitmapData = new Byte[BaseString.Length];
        bitmapData = Convert.FromBase64String(BaseString);
        Image image;
        using (MemoryStream ms = new MemoryStream(bitmapData))
        {
            Thread.Sleep(30);
            image = Image.FromStream(ms);
            image.Save(HttpContext.Current.Server.MapPath("~/") + "PDF/Temporary/Customized_Product.png", System.Drawing.Imaging.ImageFormat.Png);
        }

    }



    private void createCoverallExcel(
       int orderno,
       Dictionary<string, string> Fabric,
       Dictionary<string, string> Color,
       Dictionary<string, string> HiVi,
       Dictionary<string, string> Reflectors,
       Dictionary<string, string> Pockets,
       Dictionary<string, string> Optionals,
       Dictionary<string, string[]> Logo,
       Dictionary<string, int> sizes,
       string DeliveryDate
       )
    {
        HSSFWorkbook WorkBook;
        using (FileStream file = new FileStream(Server.MapPath(@"\Excels\Coverall.xls"), FileMode.Open, FileAccess.Read))
        {
            WorkBook = new HSSFWorkbook(file);
        }

        if (WorkBook == null)
            throw new Exception("The excel file was not created due to Workbook Creation error.");


        ISheet sheet = WorkBook.GetSheet("Coverall");
        if (sheet == null)
            throw new Exception("The excel file was not created due Sheet Creation Error");

        if (sheet.LastRowNum == 0)
            throw new Exception("The excel file was not created due Sheet Being Empty");

        //Sizes Quantity
        sheet.GetRow(4).GetCell(2).SetCellValue(orderno.ToString());
        sheet.GetRow(4).GetCell(11).SetCellValue(DateTime.Now.ToString("dd.MM.yyyy"));

        sheet.GetRow(5).GetCell(2).SetCellValue("Style Code");


        //Fabrics information
        sheet.GetRow(7).GetCell(1).SetCellValue(Fabric["fabric"]);
        sheet.GetRow(7).GetCell(8).SetCellValue(Fabric["GSM"]);

        //Color Information
        if (Convert.ToBoolean(Color["isStandard"]))
        {
            sheet.GetRow(8).GetCell(1).SetCellValue(Color["color"]);
            sheet.GetRow(8).GetCell(8).SetCellValue("none");
        }
        else
        {
            sheet.GetRow(8).GetCell(8).SetCellValue(Color["color"]);
            sheet.GetRow(8).GetCell(1).SetCellValue("none");
        }


        //HIVI Information
        sheet.GetRow(9).GetCell(4).SetCellValue(HiVi["selectedFrom"].Equals("Primary") && HiVi["color"] != "" ? HiVi["color"] : "none");
        sheet.GetRow(9).GetCell(8).SetCellValue(HiVi["selectedFrom"].Equals("Primary") ? HiVi["Placement"] : "none");
        sheet.GetRow(10).GetCell(4).SetCellValue(HiVi["selectedFrom"].Equals("Secondary") ? HiVi["color"] : "none");
        sheet.GetRow(10).GetCell(8).SetCellValue(HiVi["selectedFrom"].Equals("Secondary") ? HiVi["Placement"] : "none");
        sheet.GetRow(11).GetCell(4).SetCellValue(Convert.ToBoolean(HiVi["isLegElement"]) ? "Yes" : "No");


        //Reflectors Information
        sheet.GetRow(14).GetCell(2).SetCellValue(Reflectors["reflectorColor"]);
        sheet.GetRow(14).GetCell(5).SetCellValue(Reflectors["reflectorType"]);
        sheet.GetRow(14).GetCell(9).SetCellValue(Reflectors["body"]);
        sheet.GetRow(15).GetCell(2).SetCellValue(Reflectors["reflectorColor"]);
        sheet.GetRow(15).GetCell(5).SetCellValue(Reflectors["reflectorType"]);
        sheet.GetRow(15).GetCell(9).SetCellValue(Reflectors["arms"]);
        sheet.GetRow(16).GetCell(2).SetCellValue(Reflectors["reflectorColor"]);
        sheet.GetRow(16).GetCell(5).SetCellValue(Reflectors["reflectorType"]);
        sheet.GetRow(16).GetCell(9).SetCellValue(Reflectors["legs"]);


        //Pockets Information
        sheet.GetRow(19).GetCell(3).SetCellValue(Pockets["BodyClosing"] == "" ? "none" : Pockets["BodyClosing"]);
        sheet.GetRow(19).GetCell(7).SetCellValue(Pockets["bodyPlacement"]);
        sheet.GetRow(20).GetCell(3).SetCellValue("none");
        sheet.GetRow(20).GetCell(7).SetCellValue(Pockets["armsPlacement"]);
        sheet.GetRow(21).GetCell(3).SetCellValue(Pockets["CargoClosing"] == "" ? "none" : Pockets["CargoClosing"]);
        sheet.GetRow(21).GetCell(7).SetCellValue(Pockets["cargoPlacement"]);
        sheet.GetRow(22).GetCell(3).SetCellValue(Pockets["backPocketClosing"] == "" ? "none" : Pockets["backPocketClosing"]);
        sheet.GetRow(22).GetCell(7).SetCellValue(Pockets["backPocketPlacement"]);


        //Optionals Information
        sheet.GetRow(24).GetCell(3).SetCellValue(Optionals["mainClosing"]);
        sheet.GetRow(25).GetCell(3).SetCellValue(Optionals["nameOption"]);
        sheet.GetRow(25).GetCell(10).SetCellValue(Optionals["HSEBadge"]);
        sheet.GetRow(26).GetCell(3).SetCellValue(Optionals["gasLoop"]);
        sheet.GetRow(26).GetCell(10).SetCellValue(Optionals["ShoulderEpaulet"]);
        sheet.GetRow(27).GetCell(3).SetCellValue(Optionals["FRIcon"]);

        bool isKneePad = Convert.ToBoolean(Optionals["KneePad"]);
        bool isKneeEnfor = Convert.ToBoolean(Optionals["KneeEnforcement"]);
        bool isElbow = Convert.ToBoolean(Optionals["ElbowEnforcement"]);

        if (isKneePad)
            sheet.GetRow(27).GetCell(10).SetCellValue("Knee Pad Holders");
        if (isKneeEnfor)
            sheet.GetRow(27).GetCell(10).SetCellValue("Knee Enforcement");

        sheet.GetRow(28).GetCell(10).SetCellValue(isElbow ? "Yes" : "");

        sheet.GetRow(28).GetCell(1).SetCellValue(Optionals["winter"]);

        sheet.GetRow(31).GetCell(2).SetCellValue(Logo["ClosingType"][0] == null ? "None" : Logo["ClosingType"][0]);
        sheet.GetRow(32).GetCell(2).SetCellValue(Logo["ClosingType"][1] == null ? "None" : Logo["ClosingType"][1]);
        sheet.GetRow(33).GetCell(2).SetCellValue(Logo["ClosingType"][2] == null ? "None" : Logo["ClosingType"][2]);
        sheet.GetRow(34).GetCell(2).SetCellValue(Logo["ClosingType"][3] == null ? "None" : Logo["ClosingType"][3]);
        sheet.GetRow(35).GetCell(2).SetCellValue(Logo["ClosingType"][4] == null ? "None" : Logo["ClosingType"][4]);
        sheet.GetRow(36).GetCell(2).SetCellValue(Logo["ClosingType"][5] == null ? "None" : Logo["ClosingType"][5]);
        sheet.GetRow(37).GetCell(2).SetCellValue(Logo["ClosingType"][6] == null ? "None" : Logo["ClosingType"][6]);


        sheet.GetRow(40).GetCell(1).SetCellValue("PROTAL");




        sheet.GetRow(45).GetCell(1).SetCellValue(sizes["XS"].ToString());
        sheet.GetRow(45).GetCell(2).SetCellValue(sizes["S"].ToString());
        sheet.GetRow(45).GetCell(3).SetCellValue(sizes["M"].ToString());
        sheet.GetRow(45).GetCell(4).SetCellValue(sizes["L"].ToString());
        sheet.GetRow(45).GetCell(5).SetCellValue(sizes["XL"].ToString());
        sheet.GetRow(45).GetCell(6).SetCellValue(sizes["XXL"].ToString());
        sheet.GetRow(45).GetCell(7).SetCellValue(sizes["XXXL"].ToString());
        sheet.GetRow(45).GetCell(8).SetCellValue(sizes["XXXXL"].ToString());
        sheet.GetRow(45).GetCell(9).SetCellValue(sizes["XXXXXL"].ToString());



        sheet.GetRow(45).GetCell(12).SetCellValue(sizes["total"].ToString());

        sheet.GetRow(47).GetCell(3).SetCellValue(DeliveryDate == "" ? "N/A" : DeliveryDate);

        using(FileStream NewFile = new FileStream(Server.MapPath(@"\PDF\Temporary\Coverall.xls"), FileMode.Create))
        {
            WorkBook.Write(NewFile);
            NewFile.Close();
        }
        
        
    }

    [WebMethod]
    //public void SendMail(bool withLogo, Dictionary<string, string> UserDetails, bool hasQotation)
    public void SendMail(
        Dictionary<string, string> UserDetails,
        Dictionary<string, string[]> OrderDetails,
        Dictionary<string, string> Fabric,
        Dictionary<string, string> Color,
        Dictionary<string, string> HiVi,
        Dictionary<string, string> Reflectors,
        Dictionary<string, string> Pockets,
        Dictionary<string, string> Optionals,
        Dictionary<string, string[]> Logo
    )
    {

        bool hasQotation = (OrderDetails.Count > 0);
        bool withLogo = UserDetails["hasLogo"] == null ? false : Convert.ToBoolean(UserDetails["hasLogo"]);

        //SendMail(hasLogo, UserDetails, hasQotation);


        MailAddress fromAddress = new MailAddress("info@silver-red.com");
        MailAddress toAddress = new MailAddress(UserDetails["Email"].ToString());
       
        MailMessage customerMailMessage = new MailMessage(fromAddress, toAddress);
        MailMessage infoMailMessage = new MailMessage(fromAddress, fromAddress);

        #region Customer Mail
       
        bool withSample = Convert.ToBoolean(UserDetails["Sample"]);
        string bodyText = "";
        if (withSample && hasQotation)
        {
            bodyText = @"Hi, <br/>
<br/>
                        Thank you for your time to complete our customizer!<br/>
<br/>
                        Attached are your results combined with all the necessary information in a handy PDF booklet. <br/>
<br/>
                        One of our client representatives will contact you shortly with a quotation and delivery date for the requested sample. <br/>
<br/>
                        Might you have any further questions in regards to the prices, design or general product information; simply reply to this email. <br/>
<br/>
                        Accidents Hurts, Safety Doesn't, <br/>
<br/>
<br/>
                        Team Silver Red <br/>
                        T: +971(0)48019043<br/>
                        F: +971(0)48019101<br/>
                        E: mailto:Sales@silver-red.com <br/>
                        ";
        }
        else if (hasQotation)
        {
            bodyText = @"Hi, <br/>
<br/>
                        Thank you for your time to complete our customizer!<br/>
<br/>
                        Attached are your results combined with all the necessary information in a handy PDF booklet. <br/>
<br/>
                        We appreciate your details in regards to your enquiry and we will send you a proposal within the next 24 hours.   <br/>
<br/>
                        Might you have any further questions in the meantime or want to follow up on your enquiry; simply reply to this email. <br/>
<br/>
                        Accidents Hurts, Safety Doesn't, <br/>
<br/>
<br/>
                        Team Silver Red <br/>
                        T: +971(0)48019043<br/>
                        F: +971(0)48019101<br/>
                        E: mailto:Sales@silver-red.com <br/>
                        ";
        }
        else if (withSample)
        {
            bodyText = @"Hi, <br/>
<br/>
                        Thank you for your time to complete our customizer!<br/>
<br/>
                        Attached are your results combined with all the necessary information in a handy PDF booklet. <br/>
<br/>
                        As you have requested for a sample of the garment created, one of our client representatives will contact you asap to advise you on the delivery date. <br/>
<br/>
                        Might you have any further questions in regards to the prices, design or general product information; simply reply to this email. <br/>
<br/>
                        Accidents Hurts, Safety Doesn't, <br/>
<br/>
<br/>
                        Team Silver Red <br/>
                        T: +971(0)48019043<br/>
                        F: +971(0)48019101<br/>
                        E: mailto:Sales@silver-red.com <br/>
                        ";
        }
        else
        {
            bodyText = @"Hi, <br/>
<br/>
                        Thank you for your time to complete our customizer!<br/>
<br/>
                        Attached are your results combined with all the necessary information in a handy PDF booklet. <br/>
<br/>
                        Might you have any further questions in regards to the prices, design or general product information; simply reply to this email. <br/>
<br/>
                        Accidents Hurts, Safety Doesn't, <br/>
<br/>
<br/>
                        Team Silver Red <br/>
                        T: +971(0)48019043<br/>
                        F: +971(0)48019101<br/>
                        E: mailto:Sales@silver-red.com <br/>
                        ";
        }

        Attachment PDFAttachment = new Attachment(HttpContext.Current.Server.MapPath("~/") + "PDF/Temporary/Customized_Product.pdf");
        customerMailMessage.Attachments.Add(PDFAttachment);
       
        customerMailMessage.Subject = "Thank you";
        customerMailMessage.Body = bodyText;
        customerMailMessage.IsBodyHtml = true;

        using (var client = new SmtpClient("relay-hosting.secureserver.net", 25))
        {
            client.Send(customerMailMessage);
        }

        #endregion

        bodyText = "";


        infoMailMessage.Subject = "Customizer Request";

        bodyText = "Kindly find below a new request using the customizer web app. <br/><br/>Customer Name: " + UserDetails["FullName"].ToString() + "<br/><br/>Company Name: " + UserDetails["CompanyName"].ToString() + "<br/><br/>Mobile: " + UserDetails["Mobile"].ToString() + "<br/><br/>Landline: " + (UserDetails["LandLine"].ToString() == "" ? "Not Supplied" : UserDetails["LandLine"].ToString()) + "<br/><br/>Email Address: " + UserDetails["Email"].ToString() + "<br/><br/>Delivery Address: " + UserDetails["DeliverAddress"].ToString() + "<br/><br/>City: " + (UserDetails["City"].ToString() == "" ? "Not Supplied" : UserDetails["City"].ToString()) + "<br/><br/>Country: " + (UserDetails["Country"].ToString() == "" ? "Not Supplied" : UserDetails["Country"].ToString()) + "<br/><br/>Date: " + (UserDetails["DeliveryDate"].ToString() == "" ? "Not Supplied" : UserDetails["DeliveryDate"].ToString()) + "<br/><br/>Comments: " + (UserDetails["Comments"].ToString() == "" ? "Not Supplied" : UserDetails["Comments"].ToString()) + "<br/><br/>Requested Sample: " + (withSample ? "Yes" : "No") + "<br/>";

        infoMailMessage.Body = bodyText;
        infoMailMessage.IsBodyHtml = true;
    
        infoMailMessage.Attachments.Add(PDFAttachment);
        Attachment ExcelAttachment = new Attachment(HttpContext.Current.Server.MapPath("~/") + "PDF/Temporary/Coverall.xls");
        infoMailMessage.Attachments.Add(ExcelAttachment);
        if (withLogo)
        {
            Attachment logoAttachment = new Attachment(HttpContext.Current.Server.MapPath("~/") + "PDF/Temporary/Logo.png");
            infoMailMessage.Attachments.Add(logoAttachment);
        }

        using (var client = new SmtpClient("relay-hosting.secureserver.net", 25))
        {
            client.Send(infoMailMessage);
        }

        UpdateOrderNumber(getOrderNumber());
        checkAndDelete(true);

      

    }

    private int getOrderNumber()
    {

        using (XmlTextReader reader = new XmlTextReader(HttpContext.Current.Server.MapPath("~/") + "PDF/OrderNo.xml"))
        {
            while (reader.Read())
            {
                if (reader.NodeType == XmlNodeType.Text)
                    return Convert.ToInt32(reader.Value) + 1;
            }
        }

        return 0;
    }

    private void UpdateOrderNumber(int value)
    {
        XmlDocument doc = new XmlDocument();
        doc.Load(HttpContext.Current.Server.MapPath("~/") + "PDF/OrderNo.xml");
        doc.SelectSingleNode("//lastOrder").InnerText = value.ToString();
        doc.Save(HttpContext.Current.Server.MapPath("~/") + "PDF/OrderNo.xml");        
    }

    private void checkAndDelete(bool withImages) {
        try
        {
            if (withImages) {
                if (File.Exists(HttpContext.Current.Server.MapPath("~/") + "PDF/Temporary/Customized_Product.png"))
                    File.Delete(HttpContext.Current.Server.MapPath("~/") + "PDF/Temporary/Customized_Product.png");
                if (File.Exists(HttpContext.Current.Server.MapPath("~/") + "PDF/Temporary/Logo.png"))
                    File.Delete(HttpContext.Current.Server.MapPath("~/") + "PDF/Temporary/Logo.png");
            }
            
            if (File.Exists(HttpContext.Current.Server.MapPath("~/") + "PDF/Temporary/Customized_Product.pdf"))
                File.Delete(HttpContext.Current.Server.MapPath("~/") + "PDF/Temporary/Customized_Product.pdf");
            if (File.Exists(HttpContext.Current.Server.MapPath("~/") + "PDF/Temporary/Coverall.xls"))
                File.Delete(HttpContext.Current.Server.MapPath("~/") + "PDF/Temporary/Coverall.xls");
        }
        catch (Exception ex)
        {

        }
    }

}
