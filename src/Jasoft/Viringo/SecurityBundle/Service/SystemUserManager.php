<?php

namespace Jasoft\Viringo\SecurityBundle\Service;

/**
 * Description of SystemUserService
 *
 * @author gin
 */
class SystemUserManager {
    
    /**
     *
     * @var \Jasoft\Viringo\SecurityBundle\Repository\SystemUserRepository
     */
    private $systemUserRepository;
    
    /**
     * 
     * @param type $usename
     * @return \Jasoft\Viringo\SecurityBundle\Entity\SystemUserType
     */
    public function getSystemUserByName($usename) {
        return $this->systemUserRepository->findOneBy(array('username'=>$usename));
    }
    
    
    ///////////////////////////
    /// Getters y Setters
    ///////////////////////////
    
    public function getSystemUserRepository() {
        return $this->systemUserRepository;
    }

    public function setSystemUserRepository($systemUserRepository) {
        $this->systemUserRepository = $systemUserRepository;
    }
}
