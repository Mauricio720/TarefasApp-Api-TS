import { User } from "domain/entities/User";

test("should create user",async ()=>{
  const inputUser={
    id:'any',
    name: 'any',
    thumbnail:'any',
    email: 'any@any.com',
    login: 'any',
    password:'1234'
  }
  const user=User.create({
    name:inputUser.name, 
    email:inputUser.email, 
    login:inputUser.login, 
    password:inputUser.password
  })
  
  expect(user.id).toBe(1);
  expect(user.name).toBe("any");
  expect(user.thumbnail).toBe("any");
  expect(user.email).toBe("any@any.com");
  expect(user.login).toBe("any");
  expect(user.password).toBe("1234")
})