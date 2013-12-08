<?php

namespace Jasoft\Viringo\SecurityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * LocalSystemUser
 *
 * @ORM\Table(name="system_local_user")
 * @ORM\Entity(repositoryClass="Jasoft\Viringo\SecurityBundle\Repository\SystemLocalUserRepository")
 */
class SystemLocalUser
    implements \Symfony\Component\Security\Core\User\UserInterface, 
        \Symfony\Component\Security\Core\User\EquatableInterface
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;
    
    /**
     * @var SystemUser
     *
     * @ORM\ManyToOne(targetEntity="SystemUser")
     * @ORM\JoinColumn(name="system_user_id", referencedColumnName="id")
     */
    private $systemUser;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=255)
     */
    private $password;

    /**
     * @var string
     *
     * @ORM\Column(name="salt", type="string", length=255)
     */
    private $salt;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set password
     *
     * @param string $password
     * @return SystemLocalUser
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string 
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set salt
     *
     * @param string $salt
     * @return SystemLocalUser
     */
    public function setSalt($salt)
    {
        $this->salt = $salt;

        return $this;
    }

    /**
     * Get salt
     *
     * @return string 
     */
    public function getSalt()
    {
        return $this->salt;
    }

    public function eraseCredentials() {
        
    }

    public function getRoles() {
        
    }

    public function getUsername() {
        return $this->systemUser->getUsername();
    }


    /**
     * Set systemUser
     *
     * @param \Jasoft\Viringo\SecurityBundle\Entity\SystemUser $systemUser
     * @return SystemLocalUser
     */
    public function setSystemUser(\Jasoft\Viringo\SecurityBundle\Entity\SystemUser $systemUser = null)
    {
        $this->systemUser = $systemUser;

        return $this;
    }

    /**
     * Get systemUser
     *
     * @return \Jasoft\Viringo\SecurityBundle\Entity\SystemUser 
     */
    public function getSystemUser()
    {
        return $this->systemUser;
    }

    public function isEqualTo(\Symfony\Component\Security\Core\User\UserInterface $user) {
        if (!$user instanceof SystemLocalUser) {
            return false;
        }

        if ($this->password !== $user->getPassword()) {
            return false;
        }

        if ($this->getSalt() !== $user->getSalt()) {
            return false;
        }

        if ($this->getUsername() !== $user->getUsername()) {
            return false;
        }

        return true;
    }

}
