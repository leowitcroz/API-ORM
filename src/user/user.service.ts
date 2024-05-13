import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class UserService {


    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    async create({ email, name, password }: CreateUserDto) {

        if (await this.userRepository.exists({
            where: {
                email: email
            }
        })) {
            throw new BadRequestException('Used email already')
        }

        password = await bcrypt.hash(password, await bcrypt.genSalt())

        const user = await this.userRepository.create({ email, name, password });

        return this.userRepository.save(user);
    }

    async list() {
        return await this.userRepository.find()
    }

    async readOne(id: number) {
        return await this.userRepository.findOne({
            where: {
                id
            }
        })
    }

    async update(id: number, { email, name, password, role }: UpdatePutUserDto) {

        await this.exist(id);

        password = await bcrypt.hash(password, await bcrypt.genSalt())

        return this.userRepository.update(id, { email, name, password, role })
    }

    async updateParcial(id: number, data: UpdatePutUserDto) {

        await this.exist(id)

        if (data.password) {

            data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
        }

        await this.userRepository.update(id, data)

        return this.readOne(id)
    }


    async delete(id: number) {

        await this.exist(id)

        return await this.userRepository.delete(id)
    }

    async exist(id: number) {
        if (!(await this.userRepository.exists({
            where: {
                id
            }
        }))) {
            throw new NotFoundException('The user doesnt exist');
        }
    }

}