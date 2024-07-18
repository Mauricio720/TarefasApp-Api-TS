import { User } from "domain/entities/User";

test("should create user",async ()=>{
  const inputUser={
    name: 'any name',
    thumbnail:'any',
    email: 'any@any.com',
    password:'1234'
  }
  const user=User.create({
    name:inputUser.name, 
    email:inputUser.email, 
    thumbnail:inputUser.thumbnail,
    password:inputUser.password
  })
  
  expect(user.getId()).toBeDefined();
  expect(user.getName()).toBe("Any Name");
  expect(user.getThumbnail()).toBe("any");
  expect(user.getEmail()).toBe("any@any.com");
  expect(user.getEncryptedPassword()).toBeDefined();
})