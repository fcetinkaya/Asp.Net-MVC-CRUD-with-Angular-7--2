using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Angular7CRUD_WebAPI_3.Models;

namespace Angular7CRUD_WebAPI_3.Controllers
{
    [RoutePrefix("Api/Employee")]
    public class EmployeeAPIController : ApiController
    {
        EmployeeDBEntities db = new EmployeeDBEntities();
     

        [HttpGet]
        [Route("AllEmployeeDetails")]
        public IQueryable<Employee> GetEmployee() => db.Employees;


        [HttpGet]
        [Route("GetEmployeeDetailsById/{employeeId}")]
        public IHttpActionResult GetEmployeeById(int employeeId)
        {
            Employee em = new Employee();
            em = db.Employees.Find(employeeId);
            if (em==null)
            {
                return NotFound();
            }
            return Ok(em);
        }


        [HttpPost]
        [Route("InsertEmployee")]
        public IHttpActionResult PostEmployee(Employee data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Employees.Add(data);
            db.SaveChanges();
            return Ok(data);
        }

        [HttpPut]
        [Route("UpdateEmployee")]
        public IHttpActionResult PutEmployee(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Employee em = db.Employees.Find(employee.EmployeeID);
            if (em!=null)
            {
                em.EmpName = employee.EmpName;
                em.Address = employee.Address;
                em.EmailId = employee.EmailId;
                em.DateOfBirth = employee.DateOfBirth;
                em.Gender = employee.Gender;
                em.PinCode = employee.PinCode;
            }
            return Ok(employee);
        }

        [HttpDelete]
        [Route("DeleteEmployee")]
        public IHttpActionResult DeleteEmployee(int Id)
        {
            Employee em = db.Employees.Find(Id);
            if (em!=null)
            {
                return NotFound();
            }
            db.Employees.Remove(em);
            db.SaveChanges();
            return Ok(em);
        }
    }
}
