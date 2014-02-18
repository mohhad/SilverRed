using System;
using System.Web.Http;
using WebActivatorEx;

[assembly: PreApplicationStartMethod(typeof(ASP.App_Start.CorsConfig), "PreStart")]

namespace ASP.App_Start {
    public static class CorsConfig {
        public static void PreStart() {
            //GlobalConfiguration.Configuration.MessageHandlers.Add(new RedRocket.WebApi.Cors.CorsHandler());
        }
    }
}

