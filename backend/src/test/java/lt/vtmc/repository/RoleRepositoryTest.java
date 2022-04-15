package lt.vtmc.repository;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import lt.vtmc.model.ERole;
import lt.vtmc.model.Role;

@SpringBootTest
class RoleRepositoryTest {

	@MockBean
	private RoleRepository roleRepository;

	@Test
	void testFindByName() {
		roleRepository.save(new Role(ERole.ROLE_ADMIN));
		roleRepository.save(new Role(ERole.ROLE_MODERATOR));
		roleRepository.save(new Role(ERole.ROLE_USER));

		assertTrue(roleRepository.findByName(ERole.ROLE_ADMIN).isPresent());
	}

}
