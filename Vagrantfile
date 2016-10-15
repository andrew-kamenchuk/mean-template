VAGRANTFILE_API_VERSION="2"

app_name = "mean"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "ubuntu/trusty64"

    config.vm.synced_folder "./", "/srv/#{app_name}", create: true

    config.vm.network :forwarded_port, guest: 8080, host: 8080

    config.vm.provision :shell, path: "bootstrap.sh"

    config.vm.provider :virtualbox do |vb|
        vb.name = "ubuntu-trusty64-#{app_name}"
        vb.cpus = 2
        vb.memory = 1024
    end

end
