using Billing.Api.Helpers;
using Billing.Api.Models;
using Billing.Database;
using Billing.Repository;
using System;
using System.Linq;
using System.Threading;
using System.Web.Http;
using WebMatrix.WebData;

namespace Billing.Api.Controllers
{
    [RoutePrefix("api/agents")]
    public class AgentsController : BaseController
    {
        [TokenAuthorization("user,admin")]
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(UnitOfWork.Agents.Get().ToList().Select(x => Factory.Create(x)).ToList());
        }

        [TokenAuthorization("user,admin")]
        [Route("{name}")]
        public IHttpActionResult Get(string name)
        {
            return Ok(UnitOfWork.Agents.Get().Where(x => x.Name.Contains(name)).ToList().Select(a => Factory.Create(a)).ToList());
        }

        [TokenAuthorization("user,admin")]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            try
            {
                Agent agent = UnitOfWork.Agents.Get(id);
                if (agent == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(Factory.Create(agent));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [TokenAuthorization("user,admin")]
        [Route("")]
        public IHttpActionResult Post(AgentModel model)
        {
            try
            {
                Agent agent = Factory.Create(model);
                UnitOfWork.Agents.Insert(agent);
                UnitOfWork.Agents.Commit();
                return Ok(Factory.Create(agent));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [TokenAuthorization("user,admin")]
        [Route("{id:int}")]
        public IHttpActionResult Put(int id, AgentModel model)
        {   if((id==Identity.Agent.Id) || (Identity.CurrentUser.Roles.FirstOrDefault(x=>x.Contains("admin"))!=null))
            try
            {
                Agent agent = Factory.Create(model);
                UnitOfWork.Agents.Update(agent, id);
                UnitOfWork.Agents.Commit();
                return Ok(Factory.Create(agent));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok("You are not authorized to do this action");
        }
        [TokenAuthorization("admin")]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                Agent agent = UnitOfWork.Agents.Get(id);
                if (agent == null) return NotFound();
                UnitOfWork.Agents.Delete(id);
                UnitOfWork.Agents.Commit();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("profiles")]
        [HttpGet]
        public IHttpActionResult CreateProfiles()
        {
            WebSecurity.InitializeDatabaseConnection
                ("Billing", "Agents", "Id", "Username",
                    autoCreateTables: true);
            foreach (var agent in UnitOfWork.Agents.Get().ToList())
            {
                if (string.IsNullOrWhiteSpace(agent.Username))
                {
                    string[] names = agent.Name.Split(' ');
                    string username = names[0].ToLower();
                    agent.Username = username;
                    UnitOfWork.Agents.Update(agent, agent.Id);
                    UnitOfWork.Commit();
                }
                WebSecurity.CreateAccount(agent.Username, "billing", false);
            }
            return Ok("user profiles created");
        }
        [Route("paginate")]
        //paginate
        public IHttpActionResult Get(int currentPage = 0, int perPage = 1, string sort = " name", string search = "", string findBy = "name")
        {
            //Indexing correction
            int page = currentPage;
            var totalAgentList = UnitOfWork.Agents.Get().ToList();

            switch (sort)
            {
                case " name":
                    totalAgentList = totalAgentList.OrderBy(x => x.Name).ToList();
                    break;
                case "-name":
                    totalAgentList = totalAgentList.OrderByDescending(x => x.Name).ToList();
                    break;

               
            }


            switch (findBy)
            { 
                case "name":
                    totalAgentList = totalAgentList.Where(x => x.Name.ToLower().Contains(search.ToLower())).ToList();
                    break;

            }
            var prepare = totalAgentList;
            int totalItems = prepare.Count();
            int totalPages = (int)Math.Ceiling((Decimal)prepare.Count() / perPage);
            prepare = prepare.Skip(page * perPage).Take(perPage).ToList();
            var query = prepare.Select(x => Factory.Create(x)).ToList();

            var response = new
            {
                AgentsList = query,
                totalPages,
                totalItems,
                currentPage = page
            };



            try
            {
                return Ok(response);
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
    }
}
